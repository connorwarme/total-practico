import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyListProps {
  title: string;
  subtitle?: string;
}

const EmptyList = ({ title, subtitle }: EmptyListProps) => {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="font-psemibold text-xl text-white text-center">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-sm font-pregular text-gray-100 text-center mt-2">
          {subtitle}
        </Text>
      )}
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyList;
