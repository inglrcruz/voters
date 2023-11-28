import React, { useCallback, useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Text, View } from "../../components/Themed"
import { Btn, Container, TextLabel } from "../../constants/Styles"
import votersAction from '../../redux/actions/Voters'
import { ScrollView } from "react-native-gesture-handler"
import { TouchableHighlight } from "react-native"
import { router, useFocusEffect } from 'expo-router'
import { FontAwesome5 } from "@expo/vector-icons"
import NoRecords from "../../components/NoRecords"

type PollingStationsProps = {
  voters: any;
  getTotal: () => void;
  getAllByCode: (code: string) => void;
}

const PollingStationsLayout = ({ voters, getTotal, getAllByCode }: PollingStationsProps) => {

  const [list, setList] = useState([])

  /**
   * Function using the useFocusEffect hook to execute the getTotal function when the 
   * component is focused.
   */
  useFocusEffect(
    useCallback(() => {
      getTotal()
    }, [])
  )

  /**
   * Updates the component's 'list' state based on unique 'description' properties from 'voters.list'.
   * 
   * @param {Object} voters - Object with a 'list' property containing voter data.
   */
  useEffect(() => {
    const list: any = voters?.list.map((voter: { description: string }) => voter.description) || [];
    if (list.length) {
      const uniqueList: any = [...new Set(list)]
      setList(uniqueList)
    }
  }, [voters.list])

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
    <View style={Container.base}>
      <ScrollView horizontal={false} style={Container.scroll}>
        {list.length === 0 && <NoRecords />}
        {
          list.length > 0 &&
          list.map((row: string, k: number) => {
            const filteredList = voters.list.filter((v: any) => v.description === row);
            const totalCount = filteredList.reduce((sum: number, v: any) => sum + v.count, 0);
            return (
              <View key={k}>
                <Text style={TextLabel.titleHeader}>{row} ({totalCount})</Text>
                {
                  filteredList.map((item: any, key: number) => {
                    return (
                      <View style={Container.table} key={key}>
                        <View style={[{ width: "40%" }]}>
                          <Text style={TextLabel.title}>Mesa Electoral</Text>
                          <Text style={{ fontSize: 13 }}>{item._id}</Text>
                        </View>
                        <View style={[Container.voterLine, { width: "35%", alignItems: "center" }]}>
                          <Text style={TextLabel.votersLabel}>Total</Text>
                          <Text style={{ fontSize: 13 }}>{item.count}</Text>
                        </View>
                        <View style={[{ width: "25%", paddingLeft: 20 }]}>
                          <TouchableHighlight style={{ marginTop: 3 }} underlayColor="transparent" onPress={() => handleView(item)}>
                            <View style={[Btn.baseSm, { backgroundColor: "#6c757d" }]}>
                              <Text style={[Btn.textSm, { color: "white" }]}>
                                <FontAwesome5 size={14} name="list-alt" />
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </View>
                    )
                  })
                }
              </View>)
          })
        }
      </ScrollView >
    </View >
  )
}

const mapStateToProps = ({ voters }: any) => ({ voters })

const mapDispatchToProps = () => ({
  ...votersAction
})

export default connect(mapStateToProps, mapDispatchToProps())(PollingStationsLayout)