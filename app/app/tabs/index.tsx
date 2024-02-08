import React, { Suspense, useCallback } from "react"
import { connect } from 'react-redux'
import { Text, View } from "../../components/Themed"
import { Container, TextLabel } from "../../constants/Styles"
import votersAction from '../../redux/actions/Voters'
import { useFocusEffect } from 'expo-router'
import TableResults from "../../components/TableResults"
import { sumCount } from "../../constants/Utilities"

type PollingStationsProps = {
  voters: any;
  getTotal: () => void;
}

const PollingStationsLayout = ({ voters, getTotal }: PollingStationsProps) => {

  /**
   * Function using the useFocusEffect hook to execute the getTotal function when the 
   * component is focused.
   */
  useFocusEffect(
    useCallback(() => {
      getTotal()
    }, [])
  )

  return (
    <View style={Container.base}>
      <View style={Container.headTotal}>
        <Text style={[TextLabel.titleHeader, { marginTop: 0, marginRight: 5 }]}>Total de votantes:</Text>
        <Text style={TextLabel.titleDesc}>{sumCount(voters.list)}</Text>
      </View>
      <TableResults voters={voters.list} />
    </View>
  )
}

const mapStateToProps = ({ voters }: any) => ({ voters })

const mapDispatchToProps = () => ({
  ...votersAction
})

export default connect(mapStateToProps, mapDispatchToProps())(PollingStationsLayout)