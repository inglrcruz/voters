import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text, View } from '../../components/Themed'
import { Container, TextLabel } from '../../constants/Styles'
import { confirmAlert } from '../../constants/Alert'
import UserActions from '../../redux/actions/User'
import { router } from 'expo-router'
import { viewDate } from '../../constants/Utilities'

type ProfileProps = {
  user: any;
  getProfile: () => void;
  setSignOff: () => void;
}

type UserProps = {
  name?: string;
  username?: string;
  created?: string;
}

const TabProfileScreen = ({ user, getProfile, setSignOff }: ProfileProps) => {

  const [frm, setFrm] = useState<UserProps>({})

  /**
   * useEffect to redirect to the home page if the user is not authenticated.
   */
  useEffect(() => {
    if (!user?.auth) router.replace('/')
  }, [user])

  /**
   * useEffect to fetch user profile data on component mount.
   */
  useEffect(() => {
    async function fetchData() {
      const resp: any = await getProfile()
      setFrm(resp)
    }
    fetchData()
  }, [])

  /**
   * Function to handle user sign-off with a confirmation alert.
   */
  const handleSignOff = () => {
    confirmAlert("Cerrar Sesión", "¿Realmente quieres cerrar sesión?", [{
      text: 'Si',
      onPress: () => setSignOff()
    }, {
      text: 'Cancelar'
    }])
  }

  return (
    <View style={Container.base}>
      <View style={[Container.separator]}>
        <Image
          style={Container.profile}
          source={require('../../assets/images/profile.png')}
        />
      </View>
      <View style={[Container.separator, { alignItems: "center" }]}>
        <Text style={TextLabel.title}>Nombre</Text>
        <Text>{frm.name}</Text>
      </View>
      <View style={[Container.separator, { alignItems: "center" }]}>
        <Text style={TextLabel.title}>Usuario</Text>
        <Text>{frm.username}</Text>
      </View>
      <View style={[Container.separator, { alignItems: "center" }]}>
        <Text style={TextLabel.title}>Creado</Text>
        <Text>{viewDate(frm.created)}</Text>
      </View>
      <View style={{ marginTop: 20, width: 300, alignSelf: "center" }}>
        <Button icon="lock"
          title="Cambiar contraseña"
          onPress={() => router.push('/change-password')}
        />
      </View>
      <View style={{ marginTop: 10, width: 300, alignSelf: "center" }}>
        <Button icon="sign-out"
          title="Cerrar Sesión"
          onPress={() => handleSignOff()}
        />
      </View>
    </View>
  )
}

const mapStateToProps = ({ user }: any) => ({
  user
})

const mapDispatchToProps = () => ({
  ...UserActions
})

export default connect(mapStateToProps, mapDispatchToProps())(TabProfileScreen)