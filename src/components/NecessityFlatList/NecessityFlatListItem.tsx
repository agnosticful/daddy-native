import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewProps
} from "react-native";
import { Necessity } from "../../domains";
import Checkbox from "./Checkbox";

interface Props extends ViewProps {
  necessity: Necessity;
  onDeleteRequested: () => void;
}

function NecessityFlatListItem({
  necessity,
  onDeleteRequested,
  ...props
}: Props) {
  return (
    <>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#efefef")}
      >
        <View style={styles.container} {...props}>
          <Checkbox
            style={styles.checkbox}
            onPress={() => {
              console.log("animation, and then...");

              onDeleteRequested();
            }}
          />

          <Text style={styles.text}>{necessity.name}</Text>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.divider} />
    </>
  );
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
