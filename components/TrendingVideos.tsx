import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Video, ResizeMode } from "expo-av";
import { useEvent } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";

interface TrendingVideoProps {
  $id: string;
  title: string;
  prompt: string;
  video: string;
  thumbnail: string;
}
interface TrendingVideosProps {
  posts: TrendingVideoProps[];
}

const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.85 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};
const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.85 }],
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: TrendingVideoProps;
}) => {
  const [play, setPlay] = useState<boolean>(false);

  const player = useVideoPlayer(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      className="mr-5"
    >
      {play ? (
        <View className="flex-1 border-2 border-white/10 rounded-xl overflow-hidden">
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            player.play();
            setPlay(true);
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72 shadow-lg shadow-black/40 my-5 rounded-xl overflow-hidden"
          />
          <MaterialCommunityIcons
            name="play-circle"
            size={48}
            color="white"
            className="absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const TrendingVideos = ({ posts }: TrendingVideosProps) => {
  const [activeItem, setActiveItem] = useState(posts ? posts[1] : "");

  const changeViewableItems = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={changeViewableItems}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default TrendingVideos;

const styles = StyleSheet.create({
  video: {
    width: 208,
    height: 288,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: 5,
  },
});
