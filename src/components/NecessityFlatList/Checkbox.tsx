import { Feather } from "@expo/vector-icons";
import * as React from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps
} from "react-native";

interface Props extends ViewProps {
  onPress: (event: GestureResponderEvent) => void;
  style: any;
}

interface State {
  checkAnimation: Animated.Value;
}

class Checkbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const checkAnimation = new Animated.Value(0);

    this.state = {
      checkAnimation
    };
  }

  render() {
    const { onPress, style, ...props } = this.props;

    return (
      <TouchableWithoutFeedback onPress={event => this.onPressed(event)}>
        <Animated.View
          style={StyleSheet.flatten([styles.container, style])}
          {...props}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                width: this.state.checkAnimation.interpolate({
                  inputRange: [0, 2],
                  outputRange: [20, 0]
                }),
                height: this.state.checkAnimation.interpolate({
                  inputRange: [0, 2],
                  outputRange: [20, 0]
                }),
                margin: this.state.checkAnimation.interpolate({
                  inputRange: [0, 2],
                  outputRange: [-10, 0]
                }),
                opacity: this.state.checkAnimation.interpolate({
                  inputRange: [1, 2],
                  outputRange: [1, 0]
                })
              }
            ]}
          />

          <AnimatedFeatherIcon
            name="check"
            color="#00ff00"
            size={24}
            style={[
              styles.check,
              {
                opacity: this.state.checkAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              }
            ]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  private onPressed(event: GestureResponderEvent) {
    Animated.timing(this.state.checkAnimation, {
      toValue: 3,
      easing: Easing.ease,
      duration: 300
    }).start(() => {
      this.props.onPress(event);
    });
  }
}

const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48
  },
  circle: {
    position: "absolute",
    bottom: 24,
    left: 20,
    borderColor: "#ddd",
    borderWidth: 1.5,
    borderRadius: 10
  },
  check: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 24,
    height: 24
  }
});

export default Checkbox;
