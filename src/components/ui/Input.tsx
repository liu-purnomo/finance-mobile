import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

function Input(props: InputProps) {
  return (
    <TextInput {...props} autoCapitalize={props.autoCapitalize || "none"} />
  );
}

export default Input;
