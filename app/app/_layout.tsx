import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import Store from '../redux/Store'
import Loading from '../components/Loading'
import { colorBase, colorTextHeader } from '../constants/Colors'

export { ErrorBoundary } from 'expo-router'
export const unstable_settings = { initialRouteName: '(sing-in)' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return <RootLayoutNav />
}

function RootLayoutNav() {

  const colorScheme = useColorScheme()

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistStore(Store)}>
        <Loading />
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(sign-in)" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false, headerStyle: { backgroundColor: "#774493" } }} />
            <Stack.Screen name="add-voter" options={{
              presentation: 'modal',
              title: 'Agregar Votante', headerTintColor: colorTextHeader,
              headerStyle: { backgroundColor: colorBase }
            }} />
            <Stack.Screen name="add-user" options={{
              presentation: 'modal',
              title: 'Agregar Usuario', headerTintColor: colorTextHeader,
              headerStyle: { backgroundColor: colorBase }
            }} />
            <Stack.Screen name="see-polling-station" options={{
              presentation: 'modal', headerTintColor: colorTextHeader,
              headerStyle: { backgroundColor: colorBase }
            }} />
            <Stack.Screen name="change-password" options={{
              presentation: 'modal', headerTintColor: colorTextHeader,
              headerStyle: { backgroundColor: colorBase }
            }} />
          </Stack>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
