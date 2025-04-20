import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from '../../screens/home/MoviesScreen';
import TVShowsScreen from '../../screens/home/TVShowsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../../screens/details/DetailsScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import { COLORS } from '../../constants/styles';
import Icon from '@react-native-vector-icons/ionicons';
import SettingsScreen from '../../screens/settings/SettingsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS[0].background,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: COLORS[0].text,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Movies') {
            iconName = 'videocam';
          } else if (route.name === 'TV Show') {
            iconName = 'tv';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS[0].primary,
        tabBarInactiveTintColor: COLORS[0].text,
      })}

    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="TV Show" component={TVShowsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigation} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{
        headerShown: true,
        headerTintColor: COLORS[0].text,
        headerStyle: {
          backgroundColor: COLORS[0].background,
        },
      }} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
