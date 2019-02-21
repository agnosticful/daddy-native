import * as React from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  TouchableNativeFeedback,
  ViewProps
} from "react-native";
import { Necessity } from "../../domains";
import Checkbox from "./Checkbox";

interface Props extends ViewProps {
  necessity: Necessity;
  onDeleteRequested: () => void;
}

interface State {
  disappearanceAnimation: Animated.Value;
}

class NecessityFlatListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const disappearanceAnimation = new Animated.Value(0);

    this.state = { disappearanceAnimation };
  }

  private maxHeight: number = 1000;

  render() {
    const { necessity, onDeleteRequested, style, ...props } = this.props;

    return (
      <>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#efefef")}
          onLayout={(...args) => this.onLayout(...args)}
        >
          <Animated.View
            style={[
              styles.container,
              {
                maxHeight: this.state.disappearanceAnimation.interpolate({
                  inputRange: [6, 10],
                  outputRange: [this.maxHeight, 0]
                }),
                paddingLeft: this.state.disappearanceAnimation.interpolate({
                  inputRange: [6, 10],
                  outputRange: [8, 0]
                })
              },
              style
            ]}
            {...props}
          >
            <Checkbox
              onPress={() => this.onCheckboxPress()}
              style={[
                {
                  opacity: this.state.disappearanceAnimation.interpolate({
                    inputRange: [0, 2],
                    outputRange: [1, 0]
                  })
                }
              ]}
            />

            <Animated.Text
              style={[
                styles.text,
                {
                  opacity: this.state.disappearanceAnimation.interpolate({
                    inputRange: [0, 2],
                    outputRange: [1, 0]
                  })
                }
              ]}
            >
              {necessity.name}
            </Animated.Text>
          </Animated.View>
        </TouchableNativeFeedback>

        <Animated.View
          style={[
            styles.divider,
            {
              opacity: this.state.disappearanceAnimation.interpolate({
                inputRange: [2, 10],
                outputRange: [1, 0]
              })
            }
          ]}
        />
      </>
    );
  }

  private onLayout(event: LayoutChangeEvent) {
    this.maxHeight = event.nativeEvent.layout.height;
  }

  private onCheckboxPress() {
    Animated.timing(this.state.disappearanceAnimation, {
      toValue: 10,
      easing: Easing.ease,
      duration: 375
    }).start(() => {
      this.props.onDeleteRequested();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    backgroundColor: "#fff"
  },
  text: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    fontSize: 16,
    fontFamily: "worksans"
  },
  divider: {
    borderBottomColor: "#efefef",
    borderBottomWidth: 1
  }
});

export default NecessityFlatListItem;
