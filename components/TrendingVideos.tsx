import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

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
    transform: [{ scale: 0.9 }],
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
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: TrendingVideoProps;
}) => {
  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      className="mr-5"
    >
      <Text className="text-white">{item.title}</Text>
    </Animatable.View>
  );
};

const TrendingVideos = ({ posts }: TrendingVideosProps) => {
  const [activeItem, setActiveItem] = useState(posts ? posts[0] : "");

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  );
};

export default TrendingVideos;
