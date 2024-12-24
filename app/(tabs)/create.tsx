import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { VideoView, useVideoPlayer } from "expo-video";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

interface Form {
  title: string;
  description: string;
  thumbnail: File | null;
  video: File | null;
}
interface PickerProps {
  selectType: "image" | "video";
}

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    prompt: "",
    thumbnail: null,
    video: null,
  });
  const { user } = useGlobalContext();

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      // user canceled
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.video || !form.thumbnail || !form.title) {
      return Alert.alert("Please fill in all the fields.");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      router.push("/home");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } finally {
      setForm({ title: "", prompt: "", thumbnail: null, video: null });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          label="Title"
          placeholder="Give your video a catchy title..."
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity className="" onPress={() => openPicker("video")}>
            {form.video ? (
              <Ionicons
                name="checkmark-circle-outline"
                size={48}
                color="white"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 justify-center items-center rounded-2xl">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Ionicons name="add-circle-outline" size={24} color="white" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity className="" onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-200 justify-center items-center rounded-2xl flex-row gap-2">
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text className="text-white text-sm font-pmedium">
                  Add Thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          placeholder="The prompt you used to create this video..."
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit and Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
