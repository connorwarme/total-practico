import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SearchProps {
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
}

const SearchInput: React.FC<SearchProps> = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center space-x-4 ${
        isFocused ? "border-secondary" : "border-black-200"
      }`}
    >
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        className="flex-1 text-white font-pregular text-base mt-0.5 "
        placeholderTextColor="#7b7b8b"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity>
        <Ionicons name="search-circle-sharp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
