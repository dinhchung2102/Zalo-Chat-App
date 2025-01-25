import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export const BASE_UNIT = Math.min(width, height);
