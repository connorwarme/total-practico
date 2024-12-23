import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { StatusBar } from "expo-status-bar";
import EmptyList from "@/components/EmptyList";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Query = () => {
  const { query } = useLocalSearchParams();
  const [search, setSearch] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  const handleChangeQuery = (e: string) => setSearch(e);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="font-psemibold text-2xl text-gray-100">
                {query}
              </Text>
              <View className="my-6">
                <SearchInput
                  initialQuery={query}
                  handleChangeText={handleChangeQuery}
                  placeholder="Search..."
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title="No Videos Found"
              subtitle="No videos found for this search query."
            />
          )}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Query;
