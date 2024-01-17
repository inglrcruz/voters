import React, { useEffect } from "react"
import { FontAwesome5 } from '@expo/vector-icons'
import { connect } from 'react-redux'
import votersAction from '../../redux/actions/Voters'
import { ScrollView, TouchableHighlight } from "react-native"
import { router, Stack } from 'expo-router'
import { Btn, Container, TextLabel } from "../../constants/Styles"
import { Text, View } from "../../components/Themed"
import { confirmAlert } from "../../constants/Alert"

import { identificationCard, numFormat, phoneNumber } from "../../constants/Utilities"

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

    /**
     * Navigates to the "add-voter" route with the specified voter's information for editing.
     *
     * @param item - An object containing the voter's information to be edited.
     */
    const handleEdit = (item: any) => {
        router.push({ pathname: '/add-voter', params: item });
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Lista de votantes' }} />
            <View style={Container.base}>
                <View style={Container.headTotal}>
                    <View style={{ flexDirection: "row", marginRight: 10 }}>
                        <Text style={[TextLabel.titleHeader, { marginTop: 0, marginRight: 5 }]}>Mesa:</Text>
                        <Text style={TextLabel.titleDesc}>{voters.details[0]?.code}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[TextLabel.titleHeader, { marginTop: 0, marginRight: 5 }]}>Total de votantes:</Text>
                        <Text style={TextLabel.titleDesc}>{numFormat(voters.details.length)}</Text>
                    </View>
                </View>
                <ScrollView horizontal={false} style={Container.scroll}>
                    {
                        voters.details && voters.details.map((item: any, key: number) => {
                            return (
                                <View style={Container.people} key={key}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: "50%" }}>
                                            <Text style={TextLabel.title}>Nombre</Text>
                                            <Text style={[TextLabel.desc, { textTransform: 'capitalize' }]}>{item.full_name}</Text>
                                        </View>
                                        <View style={{ width: "30%" }}>
                                            <Text style={TextLabel.title}>Cédula</Text>
                                            <Text style={TextLabel.desc}>{identificationCard(item.identification_card)}</Text>
                                        </View>

                                    </View>
                                    <View style={[Container.address, { flexDirection: 'row' }]}>
                                        <View style={{ width: "100%" }}>
                                            <Text style={TextLabel.title}>Dirección</Text>
                                            <Text style={TextLabel.desc}>{item.address}</Text>
                                        </View>
                                    </View>
                                    <View style={[Container.address, { flexDirection: 'row' }]}>
                                        <View style={{ width: "60%" }}>
                                            <Text style={TextLabel.title}>Número de teléfono</Text>
                                            <Text style={TextLabel.desc}>{item.phone ? phoneNumber(item.phone) : "-"}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: "40%", justifyContent: 'flex-end' }}>
                                            <TouchableHighlight style={{ marginTop: 5, marginRight: 10 }} underlayColor="transparent" onPress={() => handleEdit(item)}>
                                                <View style={[Btn.baseSm, { backgroundColor: "#fff", maxWidth: 50 }]}>
                                                    <Text style={[Btn.textSm, { color: "#333", width: "100%", textAlign: "center" }]}>
                                                        <FontAwesome5 size={15} name="edit" />
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={{ marginTop: 5 }} underlayColor="transparent" onPress={() => handleRemove(item)}>
                                                <View style={[Btn.baseSm, { backgroundColor: "#dc3545", maxWidth: 50 }]}>
                                                    <Text style={[Btn.textSm, { color: "white", width: "100%", textAlign: "center" }]}>
                                                        <FontAwesome5 size={15} name="trash-alt" />
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
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