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

const DISAPPEARANCE_ANIMATION_VALUE_FROM = 0;
const DISAPPEARANCE_ANIMATION_VALUE_TO = 1;
const DISAPPEARANCE_ANIMATION_DURATION = 375;
const DISAPPEARANCE_ANIMATION_CONTENT_BREAKPOINT = 75 / 375;
const DISAPPEARANCE_ANIMATION_CONTAINER_BREAKPOINT = 1 - 150 / 375;

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

    const disappearanceAnimation = new Animated.Value(
      DISAPPEARANCE_ANIMATION_VALUE_FROM
    );

    disappearanceAnimation.addListener(({ value }) => {
      if (value === DISAPPEARANCE_ANIMATION_VALUE_TO) {
        this.onDisappearanceAnimationFinished();
      }
    });

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
                  inputRange: [
                    0,
                    DISAPPEARANCE_ANIMATION_CONTAINER_BREAKPOINT,
                    1
                  ],
                  outputRange: [this.maxHeight, this.maxHeight, 0]
                })
              },
              style
            ]}
            {...props}
          >
            <Checkbox
              style={[
                styles.checkbox,
                {
                  opacity: this.state.disappearanceAnimation.interpolate({
                    inputRange: [
                      0,
                      DISAPPEARANCE_ANIMATION_CONTENT_BREAKPOINT,
                      1
                    ],
                    outputRange: [1, 0, 0]
                  })
                }
              ]}
              onPress={() => this.onCheckboxPress()}
            />

            <Animated.Text
              style={[
                styles.text,
                {
                  opacity: this.state.disappearanceAnimation.interpolate({
                    inputRange: [
                      0,
                      DISAPPEARANCE_ANIMATION_CONTENT_BREAKPOINT,
                      1
                    ],
                    outputRange: [1, 0, 0]
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
              maxHeight: this.state.disappearanceAnimation.interpolate({
                inputRange: [0, DISAPPEARANCE_ANIMATION_CONTENT_BREAKPOINT, 1],
                outputRange: [1, 1, 0]
              }),
              opacity: this.state.disappearanceAnimation.interpolate({
                inputRange: [0, DISAPPEARANCE_ANIMATION_CONTENT_BREAKPOINT, 1],
                outputRange: [1, 1, 0]
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
      toValue: DISAPPEARANCE_ANIMATION_VALUE_TO,
      easing: Easing.ease,
      duration: DISAPPEARANCE_ANIMATION_DURATION
    }).start();
  }

  private onDisappearanceAnimationFinished() {
    this.props.onDeleteRequested();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#fff"
  },
  checkbox: {},
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
