import { DimensionValue } from "react-native";

export interface ShortcutProps {
  m?: number | "auto";
  ml?: number | "auto";
  mt?: number | "auto";
  mr?: number | "auto";
  mb?: number | "auto";
  mx?: number | "auto";
  my?: number | "auto";

  p?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  px?: number;
  py?: number;

  w?: DimensionValue;
  h?: DimensionValue;
}

export const defaultShortcuts = (props: ShortcutProps) => ({
    padding: props.p,
    paddingLeft: props.pl,
    paddingRight: props.pr,
    paddingTop: props.pt,
    paddingBottom: props.pb,
    paddingVertical: props.py,
    paddingHorizontal: props.px,
  
    margin: props.m,
    marginVertical: props.my,
    marginLeft: props.ml,
    marginHorizontal: props.mx,
    marginBottom: props.mb,
    marginTop: props.mt,
  
    width: props.w,
    height: props.h,
});