import * as React from "react";
import { StyleSheet, ViewProps } from "react-native";
import { NecessityFlatList } from "../components";

interface Props extends ViewProps {}

function ListScreen({ style, ...props }: Props) {
  return (
    <NecessityFlatList
      style={StyleSheet.flatten([styles.container, style])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

export default ListScreen;
