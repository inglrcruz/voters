import { FontAwesome5 } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { connect } from 'react-redux'
import { colorTextHeader, colorBase, colorHover } from '../../constants/Colors'

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) => {
  return <FontAwesome5 size={18} style={{ marginBottom: -5 }} {...props} />;
}

type TabProps = {
  user: any
}

const TabLayout = ({ user }: TabProps) => {

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorBase,
          paddingBottom: 5
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: colorHover
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mesas Electorales',
          tabBarLabel: 'Mesas',
          headerTintColor: colorTextHeader,
          headerStyle: {
            backgroundColor: colorBase
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="vote-yea" color={color} />,
          headerRight: () => (
            <Link href="/add-voter" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5 name="plus" size={18} color="white" style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Lista de Usuarios',
          tabBarLabel: 'Usuarios',
          headerTintColor: colorTextHeader,
          headerStyle: {
            backgroundColor: colorBase
          },
          tabBarButton: ((user?.auth?.role || null) === "user") ? () => null : undefined,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          headerRight: () => (
            <Link href="/add-user" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5 name="plus" size={18} color="white" style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Mi Perfil',
          headerTintColor: colorTextHeader,
          headerStyle: {
            backgroundColor: colorBase
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user-tie" color={color} />
        }}
      />
    </Tabs>
  )
}

const mapStateToProps = ({ user }: any) => ({ user })

export default connect(mapStateToProps, null)(TabLayout)