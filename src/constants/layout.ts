import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export interface Layout {
  window: {
    width: number;
    height: number;
  };
  isSmallDevice: boolean;
}

const layout: Layout = {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375
};

export default layout;
