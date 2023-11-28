import React, { useState } from "react"
import { connect } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import UserAction from '../../redux/actions/User'
import { TextInput } from "react-native"
import { router } from 'expo-router'
import { Container, TextFiled } from "../../constants/Styles"
import { Button, Text, View } from "../../components/Themed"
import { ROLES } from "../../constants/Utilities"

type FrmTable = {
    name?: string
    username?: string
    password?: string
    role?: string
}

type LstRole = {
    id?: string
    label?: string
}

type VoteProps = {
    setUser: (form: FrmTable) => void;
}

const AddUserLayout = ({ setUser }: VoteProps) => {

    const [frmData, setFrmData] = useState<FrmTable>({})
    const [errors, setErrors] = useState<Partial<FrmTable>>({})
    const [role] = useState<LstRole[]>(ROLES)

    /**
     * Handles the change event for input fields in a form.
     * 
     * @param {string} txt - The new text value.
     * @param {string} name - The name of the field being updated.
     */
    const handleChange = (txt: string, name: string) => {
        setFrmData({ ...frmData, [name]: txt })
    }

    /**
     * Handles the form submission, validates form data, sets errors, and, if no 
     * errors, sets the user and redirects to '/tabs/users'.
     */
    const handleSubmit = async () => {
        const ERROR_MESSAGES: any = {
            name: 'El campo nombre',
            username: 'El campo usuario',
            password: 'El campo contraseña',
            role: 'El campo rol'
        }
        const newErrors: Partial<any> = {}
        setErrors(newErrors)
        const form: any = frmData
        for (const field in ERROR_MESSAGES) {
            if ((typeof form[field] === "string" && !form[field].trim()) || !form[field]) newErrors[field] = `* ${ERROR_MESSAGES[field]} es requerido.`;
        }
        if (!Object.keys(newErrors).length) {
            await setUser(frmData)
            router.replace('/tabs/users')
        }
        setErrors(newErrors)
    }

    return (
        <View style={Container.base}>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Nombre:</Text>
                <TextInput
                    style={TextFiled.textInput}
                    value={frmData.name}
                    placeholder="Escribe el nombre..."
                    onChangeText={(txt) => handleChange(txt, 'name')}
                />
                {errors.name && <Text style={TextFiled.textError}>{errors.name}</Text>}
            </View>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Nombre de usuario:</Text>
                <TextInput
                    multiline
                    numberOfLines={2}
                    style={TextFiled.textInput}
                    value={frmData.username}
                    placeholder="Escribe el nombre de usuario..."
                    onChangeText={(txt) => handleChange(txt, 'username')}
                />
                {errors.username && <Text style={TextFiled.textError}>{errors.username}</Text>}
            </View>
            <View style={[TextFiled.base, { marginTop: 20 }]}>
                <Text style={TextFiled.text}>Contraseña:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={TextFiled.textInput}
                    value={frmData.password}
                    placeholder="Escribe la contraseña..."
                    onChangeText={(txt) => handleChange(txt, 'password')}
                />
                {errors.password && <Text style={TextFiled.textError}>{errors.password}</Text>}
            </View>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Rol:</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Picker
                        placeholder="Seleccione la colegio electoral..."
                        selectedValue={frmData.role}
                        onValueChange={(val) => handleChange(val, 'role')}>
                        <Picker.Item style={{ color: "#9f9f9f", fontSize: 14 }} label="Seleccione el rol..." value="" />
                        {role && role.map((row: LstRole, key: number) => <Picker.Item key={key} label={row.label} value={row.id} />)}
                    </Picker>
                </View>
                {errors.role && <Text style={TextFiled.textError}>{errors.role}</Text>}
            </View>
            <View style={[TextFiled.base, { width: 150, alignSelf: "center", marginTop: 10 }]}>
                <Button title="Guardar" icon="check" type="success" onPress={handleSubmit} />
            </View>
        </View>
    )
}

const mapDispatchToProps = () => ({
    ...UserAction
})

export default connect(null, mapDispatchToProps())(AddUserLayout)