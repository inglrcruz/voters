import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import votersAction from '../../redux/actions/Voters'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Container, TextLabel } from "../../constants/Styles"
import { Text, View } from "../../components/Themed"
import TableResults from "../../components/TableResults"
import { sumCount } from "../../constants/Utilities"

type SeePollStaProps = {
    getTotalByUser: (uid: string) => void;
}

const ResultByUserLayout = ({ getTotalByUser }: SeePollStaProps) => {

    const { uid, name } = useLocalSearchParams()
    const [list, setList] = useState([])

    /**
     * useEffect hook to fetch and update data based on the user identifier.
     * This hook is triggered whenever the 'uid' dependency changes.
     */
    useEffect(() => {
        const user: any = uid
        async function fetchData() {
            const resp: any = await getTotalByUser(user)
            setList(resp)
        }
        fetchData()
    }, [uid])

    return (
        <>
            <Stack.Screen options={{ title: 'Resultados de usuario' }} />
            <View style={Container.base}>
                <View style={Container.headTotal}>
                    <View style={{ flexDirection: "row", marginRight: 10 }}>
                        <Text style={[TextLabel.titleHeader, { marginTop: 0, marginRight: 5 }]}>Usuario:</Text>
                        <Text style={TextLabel.titleDesc}>{name}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[TextLabel.titleHeader, { marginTop: 0, marginRight: 5 }]}>Total:</Text>
                        <Text style={TextLabel.titleDesc}>{sumCount(list)}</Text>
                    </View>
                </View>
                <TableResults voters={list} />
            </View>
        </>
    )
}

const mapStateToProps = ({ voters }: any) => ({ voters })

const mapDispatchToProps = () => ({ ...votersAction })

export default connect(mapStateToProps, mapDispatchToProps())(ResultByUserLayout)