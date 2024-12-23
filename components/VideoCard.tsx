import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";

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
  const [vidIsPlaying, setIsPlaying] = useState<boolean>(false);

  const player = useVideoPlayer(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

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
        {vidIsPlaying ? (
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : (
          <TouchableOpacity
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => {
              setIsPlaying(true);
              player.play();
            }}
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

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 240,
    borderRadius: "35px",
    marginHorizontal: 5,
  },
});
