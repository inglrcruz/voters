import React, { useEffect } from "react"
import { FontAwesome5 } from '@expo/vector-icons'
import { connect } from 'react-redux'
import votersAction from '../../redux/actions/Voters'
import { ScrollView, TouchableHighlight } from "react-native"
import { Stack } from 'expo-router'
import { Btn, Container, TextLabel } from "../../constants/Styles"
import { Text, View } from "../../components/Themed"
import { confirmAlert } from "../../constants/Alert"
import { router } from 'expo-router'
import { identificationCard } from "../../constants/Utilities"

type VoteProps = {
    voters: any;
    setRemove: (id: string) => void;
}

const SeePollingStationLayout = ({ setRemove, voters }: VoteProps) => {

    useEffect(() => {
        if (voters.details.length <= 0) router.replace('/tabs')
    }, [voters.details])

    /**
     * Handles the removal of a record asynchronously.
     * 
     * @param {any} item - The item to be removed.
     */
    const handleRemove = async (item: any) => {
        confirmAlert("Eliminar votante", "¿Está seguro de que desea eliminar este votante?", [{
            text: 'Si',
            onPress: () => setRemove(item._id)
        }, {
            text: 'No'
        }])
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Mesa electoral ' + voters.details[0]?.code }} />
            <View style={Container.base}>
                <Text style={TextLabel.titleHeader}>Lista de votantes</Text>
                <ScrollView horizontal={false} style={Container.scroll}>
                    {
                        voters.details && voters.details.map((item: any, key: number) => {
                            return (
                                <View style={Container.people} key={key}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: "50%" }}>
                                            <Text style={TextLabel.title}>Nombre Completo</Text>
                                            <Text style={TextLabel.desc}>{item.full_name}</Text>
                                        </View>
                                        <View style={{ width: "30%" }}>
                                            <Text style={TextLabel.title}>Cédula</Text>
                                            <Text style={TextLabel.desc}>{identificationCard(item.identification_card)}</Text>
                                        </View>
                                        <View style={{ alignItems: "center", width: "20%" }}>
                                            <TouchableHighlight style={{ marginTop: 5 }} underlayColor="transparent" onPress={() => handleRemove(item)}>
                                                <View style={[Btn.baseSm, { backgroundColor: "#dc3545", width: "80%" }]}>
                                                    <Text style={[Btn.textSm, { color: "white", width: "100%", textAlign: "center" }]}>
                                                        <FontAwesome5 size={15} name="trash-alt" />
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={Container.address}>
                                        <Text style={TextLabel.title}>Dirección</Text>
                                        <Text style={TextLabel.desc}>{item.address}</Text>
                                    </View>
                                </View>)
                        })
                    }
                </ScrollView>
            </View>
        </>
    )
}

const mapStateToProps = ({ voters }: any) => ({ voters })

const mapDispatchToProps = () => ({ ...votersAction })

export default connect(mapStateToProps, mapDispatchToProps())(SeePollingStationLayout)