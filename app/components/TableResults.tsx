import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons'
import { ScrollView, TouchableHighlight } from "react-native"
import { Btn, Container, TextLabel } from "../constants/Styles"
import votersAction from '../redux/actions/Voters'
import { Text, View } from "../components/Themed"
import NoRecords from "./NoRecords"
import { router } from 'expo-router'
import { colorSecondary } from "../constants/Colors"
import { numFormat } from "../constants/Utilities"

type TabRestProps = {
    voters: any;
    getAllByCode: (code: string) => void;
}

const TableResults = ({ voters, getAllByCode }: TabRestProps) => {

    const [list, setList] = useState([])

    /**
     * Updates the component's 'list' state based on unique 'description' properties from 'voters'.
     * 
     * @param {Object} voters - Object with a 'list' property containing voter data.
     */
    useEffect(() => {
        const list: any = voters.map((voter: { description: string }) => voter.description) || [];
        if (list.length) {
            const uniqueList: any = [...new Set(list)]
            setList(uniqueList)
        }
    }, [voters])

    /**
     * Handles the view action for a specific item.
     * Retrieves item data by ID using getAllByCode and navigates to '/see-polling-station' route.
     * 
     * @param {any} item - The item triggering the view action.
     */
    const handleView = async (item: any) => {
        await getAllByCode(item.ecid)
        router.push('/see-polling-station')
    }

    return (
        <ScrollView horizontal={false} style={Container.scroll}>
            {list.length === 0 && <NoRecords />}
            {
                list.length > 0 &&
                list.map((row: string, k: number) => {
                    const filteredList = voters.filter((v: any) => v.description === row);
                    const totalCount = filteredList.reduce((sum: number, v: any) => sum + v.count, 0);
                    return (
                        <View key={k} style={{ backgroundColor: 'transparent' }}>
                            <Text style={TextLabel.titleHeader}>{row} ({totalCount})</Text>
                            {
                                filteredList.map((item: any, key: number) => {
                                    return (
                                        <TouchableHighlight key={key} style={{ marginTop: 3 }} underlayColor="transparent" onPress={() => handleView(item)}>
                                            <View style={Container.table}>
                                                <View style={[{ width: "65%" }]}>
                                                    <Text style={TextLabel.title}>Mesa Electoral</Text>
                                                    <Text style={{ fontSize: 13 }}>{item._id}</Text>
                                                </View>
                                                <View style={[Container.voterLine, { width: "35%", alignItems: "center" }]}>
                                                    <Text style={TextLabel.votersLabel}>Total</Text>
                                                    <Text style={{ fontSize: 13 }}>{numFormat(item.count)}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                        </View>)
                })
            }
        </ScrollView >
    )
}

const mapDispatchToProps = () => ({
    ...votersAction
})

export default connect(null, mapDispatchToProps())(TableResults)