import React from "react";
import { View } from "react-native";
import styles from "./MediaControls.style";

const Controls = (props: any) => {
  const {
    //isLoading,
    controlsStyle,
    buttonsComponent,
    //isLoadingComponent,
  } = props;

  const content = (
    <View style={controlsStyle}>
      {buttonsComponent}
    </View>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
