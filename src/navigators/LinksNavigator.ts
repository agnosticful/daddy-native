import { createStackNavigator } from "react-navigation";
import { LinksScreen } from "../screens";

const LinksNavigator = createStackNavigator({
  Links: {
    screen: LinksScreen,
    navigationOptions: {
      title: "Links"
    }
  }
});

export default LinksNavigator;
