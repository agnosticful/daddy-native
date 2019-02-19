import { createStackNavigator } from "react-navigation";
import { SettingsScreen } from "../screens";

const SettingsNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: "app.json"
    }
  }
});

export default SettingsNavigator;
