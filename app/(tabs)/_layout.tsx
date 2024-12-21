import { View, Text, Image } from "react-native";
import React, { TableHTMLAttributes } from "react";
import { Tabs, Redirect } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import icons from "../../constants/icons";

interface TabIconProps {
  icon: any;
  focused: boolean;
  color: string;
  name: string;
}
const TabIcon: React.FC<TabIconProps> = ({ icon, focused, color, name }) => {
  return (
    <View className="flex items-center justify-center gap-2 w-64">
      <Image
        source={icon}
        resizeMode="contain"
        className="h-6 w-6"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarActiveTintColor: "#FFA001",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <Text
                className={`${
                  focused ? "font-psemibold" : "font-pregular"
                } text-xs`}
                style={{ color: color }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <Text
                className={`${
                  focused ? "font-psemibold" : "font-pregular"
                } text-xs`}
                style={{ color: color }}
              >
                Bookmark
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Ionicons name="bookmarks" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <Text
                className={`${
                  focused ? "font-psemibold" : "font-pregular"
                } text-xs`}
                style={{ color: color }}
              >
                Create
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
              <Text
                className={`${
                  focused ? "font-psemibold" : "font-pregular"
                } text-xs`}
                style={{ color: color }}
              >
                Profile
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
