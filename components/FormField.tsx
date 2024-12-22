import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center ${
          isFocused ? "border-secondary" : "border-black-200"
        }`}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={label === "Password" && !showPassword}
          className="flex-1 text-white font-psemibold text-base"
          placeholderTextColor="#7b7b8b"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {label === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="p-2"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
