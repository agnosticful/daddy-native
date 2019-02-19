import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ViewProps } from "react-native";

import { colors } from "../constants";

interface Props extends ViewProps {
  name: string;
  focused?: true;
}

function TabBarIcon({ name, focused, ...props }: Props) {
  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? colors.tabIconSelected : colors.tabIconDefault}
      {...props}
    />
  );
}

export default TabBarIcon;
