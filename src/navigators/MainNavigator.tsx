import * as React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { TabBarIcon } from "../components";
import LinksNavigator from "./LinksNavigator";
import ListNavigator from "./ListNavigator";
import SettingsNavigator from "./SettingsNavigator";

const MainNavigator = createBottomTabNavigator({
  ListStack: {
    screen: ListNavigator,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }: { focused?: true }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? `ios-information-circle${focused ? "" : "-outline"}`
              : "md-information-circle"
          }
        />
      )
    }
  },
  LinksStack: {
    screen: LinksNavigator,
    navigationOptions: {
      tabBarLabel: "Links",
      tabBarIcon: ({ focused }: { focused?: true }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-link" : "md-link"}
        />
      )
    }
  },
  SettingsStack: {
    screen: SettingsNavigator,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ focused }: { focused?: true }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-options" : "md-options"}
        />
      )
    }
  }
});

export default MainNavigator;
