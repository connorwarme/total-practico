import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import { StatusBar } from "expo-status-bar";
import TrendingVideos from "@/components/TrendingVideos";
import EmptyList from "@/components/EmptyList";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data: posts, loading, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = () => {
    setRefreshing(true);
    // fetch data
    refetch();
    setRefreshing(false);
  };

  const handleChangeQuery = (e: string) => setQuery(e);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="font-psemibold text-2xl text-gray-100">
                    Current User
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    resizeMode="contain"
                    className="w-9 h-10"
                  />
                </View>
              </View>
              <SearchInput
                value={query}
                handleChangeText={handleChangeQuery}
                placeholder="Search..."
              />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Trending Videos
                </Text>
                <TrendingVideos posts={latestPosts ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title="No Videos Found"
              subtitle="Be the first to upload a video!"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
