import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname, router } from "expo-router";

interface SearchProps {
  value?: string;
  placeholder: string;
  initialQuery?: string;
  otherStyles?: string;
}

const SearchInput: React.FC<SearchProps> = ({
  value,
  placeholder,
  initialQuery,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState<string>(initialQuery || "");
  const pathname = usePathname();

  const handleChangeQuery = (e: string) => {
    setQuery(e);
  };

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center space-x-4 ${
        isFocused ? "border-secondary" : "border-black-200"
      }`}
    >
      <TextInput
        value={query}
        placeholder={placeholder}
        onChangeText={(e) => setQuery(e)}
        className="flex-1 text-white font-pregular text-base mt-0.5 "
        placeholderTextColor="#cdcde0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please enter a query to search the database."
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Ionicons name="search-circle-sharp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
