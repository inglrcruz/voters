import { StyleSheet } from 'react-native'
import { Button, Text, View } from '../components/Themed'
import { colorBase } from '../constants/Colors'
import { Container, TextFiled } from '../constants/Styles'
import { Image } from 'react-native'
import { router } from 'expo-router'

const NotFoundScreen = () => {

  const handleSubmit = async () => {
    router.replace('/tabs')
  }

  return (
    <View style={styles.container}>
      <Image style={Container.logo} source={require('../assets/images/logo.jpg')} />
      <Text style={styles.title}>Pedimos disculpas, pero lamentablemente no podemos encontrar la pantalla que estás buscando en este momento.</Text>
      <View style={[TextFiled.base, { width: 250, alignSelf: "center", marginTop: 20 }]}>
        <Button title="Ir atrás" icon="arrow-left" type="success" onPress={handleSubmit} />
      </View>
    </View>
  )
}

export default NotFoundScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBase,
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 18,
    margin: 10,
    textAlign: 'center'
  }
});
