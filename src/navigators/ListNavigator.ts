import { createStackNavigator } from "react-navigation";
import { ListScreen } from "../screens";

const ListNavigator = createStackNavigator({
  List: {
    screen: ListScreen
  }
});

export default ListNavigator;
