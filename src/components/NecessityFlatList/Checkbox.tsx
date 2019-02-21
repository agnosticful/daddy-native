import * as React from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps
} from "react-native";

interface Props extends ViewProps {
  onPress: (event: GestureResponderEvent) => void;
  style: any;
}

function Checkbox({ onPress, style, ...props }: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={StyleSheet.flatten([styles.container, style])}
        {...props}
      >
        <View style={styles.circle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  circle: {
    width: 20,
    height: 20,
    borderColor: "#ddd",
    borderWidth: 1.5,
    borderRadius: 10
  }
});

export default Checkbox;
