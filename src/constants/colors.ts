const tintColor = "#2f95dc";

export interface Colors {
  tintColor: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBar: string;
  errorBackground: string;
  errorText: string;
  warningBackground: string;
  warningText: string;
  noticeBackground: string;
  noticeText: string;
}

const colors: Colors = {
  tintColor,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff"
};

export default colors;
