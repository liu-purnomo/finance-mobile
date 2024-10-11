import { useFormikContext } from "formik";
import React, { FC } from "react";
import { Text, View, useColorScheme } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

interface InputFieldProps {
  // Extend InputFieldProps with TextInputProps
  name: string;
  label?: string;
  data: Data[];
  className?: string;
  disabled?: boolean;
  save?: "key" | "value" | undefined;
  cb?: (value: string) => void;
}

interface Data {
  key: string;
  value: string;
}

const SelectField: FC<InputFieldProps> = ({
  name,
  label,
  data,
  className = "flex w-full",
  disabled = false,
  save = "value",
  cb,
}) => {
  const formik = useFormikContext<any>();
  const isDark = useColorScheme() === "dark";

  const handleOnChange = (value: string) => {
    if (cb) {
      cb(value);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <View className={className}>
      {label && (
        <Text className={`text-start mb-2 ${isDark ? "text-white" : ""}`}>
          {label}
        </Text>
      )}

      <SelectList
        boxStyles={{
          backgroundColor: "rgb(224 242 254)",
          borderColor: "rgb(224 242 254)",
          paddingTop: 15,
          paddingBottom: 14,
          borderRadius: 14,
        }}
        dropdownTextStyles={
          isDark
            ? {
                color: "white",
              }
            : {}
        }
        save={save}
        setSelected={(val: string) => handleOnChange(val)}
        data={data}
        placeholder={formik.values[name] || `Pilih ${label}`}
      />
    </View>
  );
};

export default SelectField;
