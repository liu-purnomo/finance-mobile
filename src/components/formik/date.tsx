import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import moment from "moment";
import "moment/min/moment-with-locales";
import React, { FC, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DateFieldProps {
  name: string;
  label?: string;
  className?: string;
}

interface Data {
  key: string;
  value: string;
}

moment.locale("id-ID");

const DateField: FC<DateFieldProps> = ({
  name,
  label,
  className = "flex w-full",
  ...OptionProps
}) => {
  const formik = useFormikContext<any>();
  const isDark = useColorScheme() === "dark";

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    formik.setFieldValue(name, selectedDate);
    setOpen(false);
    setDate(currentDate);
  };

  return (
    <View className={className}>
      {label && (
        <Text className={`text-start mb-2 ${isDark ? "text-white" : ""}`}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        className="mt-2 rounded-xl bg-sky-100 py-4"
        onPress={() => setOpen(true)}
      >
        {open ? (
          <DateTimePicker
            value={
              formik.values[name] ? new Date(formik.values[name]) : new Date()
            }
            mode="date"
            onChange={onChange}
          />
        ) : (
          <Text className=" pl-5 ">
            {moment(formik.values[name]).format("LL")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DateField;
