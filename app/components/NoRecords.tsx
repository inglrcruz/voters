import { Dimensions } from "react-native"
import { Text, View } from "./Themed"
import { FontAwesome5 } from '@expo/vector-icons'
import { Container } from "../constants/Styles"

const NoRecords = () => {

    return (
        <View style={Container.noRecords}>
            <FontAwesome5 name="sad-tear" size={70} color="#ddd" />
            <Text style={{ color: "#ddd", marginTop: 10 }}>No hay registros disponibles en este momento.</Text>
        </View>
    )
}

export default NoRecords