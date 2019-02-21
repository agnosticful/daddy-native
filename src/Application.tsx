import * as React from "react";
import { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, ViewProps } from "react-native";
import { createAppContainer } from "react-navigation";
import { AppLoading, Asset, Font } from "expo";
import { RootNavigator } from "./navigators";
import { FakeNecessityRepository, NecessityRepository } from "./services";
import { NecessityRepositoryContext } from "./components";

interface Props extends ViewProps {
  skipLoadingScreen?: true;
}

export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.necessityRepository = new FakeNecessityRepository();
  }

  private necessityRepository: NecessityRepository;

  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NecessityRepositoryContext.Provider value={this.necessityRepository}>
          <View style={styles.container}>
            {Platform.OS === "ios" && (
              <StatusBar backgroundColor="blue" barStyle="default" />
            )}
            <ApplicationContainer />
          </View>
        </NecessityRepositoryContext.Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require("../assets/images/robot-dev.png"),
        require("../assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        worksans: require("../assets/fonts/WorkSans-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const ApplicationContainer = createAppContainer(RootNavigator);
