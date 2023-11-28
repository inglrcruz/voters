import React, { useEffect } from "react"
import { FontAwesome5 } from '@expo/vector-icons'
import { connect } from 'react-redux'
import UserActions from '../../redux/actions/User'
import { ScrollView, TouchableHighlight } from "react-native"
import { Btn, Container, TextLabel } from "../../constants/Styles"
import { Text, View } from "../../components/Themed"
import { confirmAlert } from "../../constants/Alert"
import { getRole, viewDate } from "../../constants/Utilities"
import NoRecords from "../../components/NoRecords"

type UserProps = {
  user: any;
  getList: () => void;
  setRemove: (id: string) => void;
}

const TabUsersScreen = ({ getList, setRemove, user }: UserProps) => {
  
  /**
   * useEffect to fetch and set the list on component mount.
   * This effect runs only once, equivalent to componentDidMount.
   */
  useEffect(() => {
    getList()
  }, [])

  /**
   * Handles the removal of a user.
   * @param item The user object to be removed.
   */
  const handleRemove = async (item: any) => {
    confirmAlert("Eliminar usuario", "¿Está seguro de que desea eliminar este usuario?", [{
      text: 'Si',
      onPress: () => setRemove(item._id)
    }, {
      text: 'No'
    }])
  }

  return (
    <>
      <View style={Container.base}>
        { user.list.length > 0 && <Text style={TextLabel.titleHeader}>Lista de usuario</Text> }
        <ScrollView horizontal={false} style={Container.scroll}>
          { user.list.length === 0 && <NoRecords /> }
          {
            user.list && user.list.map((item: any, key: number) => {
              return (
                <View style={Container.people} key={key}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: "50%" }}>
                      <Text style={TextLabel.title}>Nombre</Text>
                      <Text style={TextLabel.desc}>{item.name}</Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <Text style={TextLabel.title}>Usuario</Text>
                      <Text style={TextLabel.desc}>{item.username}</Text>
                    </View>
                    <View style={{ alignItems: "center", width: "20%" }}>
                      <Text style={TextLabel.title}>Rol</Text>
                      <Text style={TextLabel.desc}>{getRole(item.role)}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', borderTopWidth: 1, borderStyle: "dashed", borderColor: "#ddd", marginTop: 5, paddingTop: 3 }}>
                    <View style={{ width: "75%" }}>
                      <Text style={TextLabel.title}>Creado</Text>
                      <Text style={TextLabel.desc}>{viewDate(item.created)}</Text>
                    </View>
                    <View style={{ alignItems: "center", width: "25%" }}>
                      <TouchableHighlight style={{ marginTop: 5, marginRight: 5, width: 100 }} underlayColor="transparent" onPress={() => handleRemove(item)}>
                        <View style={[Btn.baseSm, { backgroundColor: "#dc3545" }]}>
                          <Text style={[Btn.textSm, { color: "white" }]}>
                            <FontAwesome5 size={13} name="trash-alt" />&nbsp;&nbsp;Eliminar
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

const mapStateToProps = ({ user }: any) => ({ user })

const mapDispatchToProps = () => ({
  ...UserActions
})

export default connect(mapStateToProps, mapDispatchToProps())(TabUsersScreen)