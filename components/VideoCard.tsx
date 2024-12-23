import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface VideoCardProps {
  video: {
    title: string;
    prompt: string;
    video: string;
    thumbnail: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}

const VideoCard = ({
  video: {
    title,
    prompt,
    video,
    thumbnail,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white text-sm font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
        </View>
      </View>
      <View className="flex-1 w-full">
        {isPlaying ? (
          <Text className="text-white">Playing</Text>
        ) : (
          <TouchableOpacity
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setIsPlaying(true)}
          >
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              className="w-full h-full rounded-xl mt-3"
            />
            <MaterialCommunityIcons
              name="play-circle"
              size={48}
              color="white"
              className="absolute"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
