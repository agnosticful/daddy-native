import "react-native";
import * as React from "react";
import { MonoText } from "./StyledText";
import * as renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
