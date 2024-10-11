import { styled } from "nativewind";
import React from "react";
import { TouchableOpacity } from "react-native";

const StyledButton = styled(TouchableOpacity);

function Button(props: any) {
  return (
    <StyledButton activeOpacity={0.5} {...props}>
      {props.children}
    </StyledButton>
  );
}

export default Button;
