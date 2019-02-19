import "react-native";
import * as React from "react";
import App from "./Application";
import * as renderer from "react-test-renderer";
// import NavigationTestUtils from "react-navigation";

describe("App snapshot", () => {
  jest.useFakeTimers();

  // TODO:
  // I couldn't find This API on latest react-navigation
  // beforeEach(() => {
  //   NavigationTestUtils.resetInternalState();
  // });

  it("renders the loading screen", async () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the root without loading screen", async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
