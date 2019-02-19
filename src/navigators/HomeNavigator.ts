import { createStackNavigator } from "react-navigation";
import { HomeScreen } from "../screens";

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default HomeNavigator;
