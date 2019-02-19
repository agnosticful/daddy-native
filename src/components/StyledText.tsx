import * as React from "react";
import { ReactNode } from "react";
import { Text, ViewProps } from "react-native";

interface Props extends ViewProps {
  children?: ReactNode;
}

export function MonoText({ style, ...props }: Props) {
  return <Text style={[style, { fontFamily: "space-mono" }]} {...props} />;
}
