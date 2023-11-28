import { Dimensions } from "react-native"
import { connect } from 'react-redux'
import { Text, View } from "./Themed"
import { FontAwesome5 } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

type LdgProps = {
    loading: boolean;
}

const Loading = ({ loading }: LdgProps) => {

    const window = Dimensions.get('window')

    return (
        <>
            {loading &&
                <View style={{ position: "absolute", justifyContent: 'center', alignItems: 'center', zIndex: 999, width: window.width, height: window.height + 100, padding: 10, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <Animatable.View animation="rotate" easing="linear" iterationCount="infinite">
                        <FontAwesome5 name="spinner" size={25} color="white" />
                    </Animatable.View>
                    <Text style={{ color: "white", marginTop: 5 }}>Espere, cargando...</Text>
                </View>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.config.loading
})

export default connect(mapStateToProps, null)(Loading)