import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

interface FormProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-4/5 px-4 my-6">
            <Image
              source={images.logo}
              className="h-[35px] w-[115px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-psemibold text-center mt-5">
              Log in to Aora
            </Text>
            <View className="w-full mt-5">
              <FormField
                label="Email"
                value={form.email}
                handleChangeText={(e: string) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
                placeholder="you@example.com"
              />
              <FormField
                label="Password"
                value={form.password}
                handleChangeText={(e: string) =>
                  setForm({ ...form, password: e })
                }
                otherStyles="mt-7"
                placeholder="********"
              />
              <CustomButton
                title="Sign In"
                containerStyles="mt-7"
                handlePress={handleSubmit}
                isLoading={isSubmitting}
              />
              <View className="justify-center items-center pt-5 flex-row gap-2">
                <Text className="text-white text-center font-pregular">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-secondary font-psemibold"
                  >
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
};

export default SignIn;
