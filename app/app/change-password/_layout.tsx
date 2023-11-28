import React, { useState } from "react"
import { connect } from 'react-redux'
import UserAction from '../../redux/actions/User'
import { TextInput } from "react-native"
import { Stack, router } from 'expo-router'
import { Container, TextFiled } from "../../constants/Styles"
import { Button, Text, View } from "../../components/Themed"
import { errorAlert } from "../../constants/Alert"

type FrmData = {
    current_password?: string
    new_password?: string
    repeat_new_password?: string
}

type FrmChange = {
    current_password?: string
    password?: string
}

type ChgPassProps = {
    setChangePassword: (form: FrmChange) => void;
}

const ChangePasswordLayout = ({ setChangePassword }: ChgPassProps) => {

    const [frmData, setFrmData] = useState<FrmData>({})
    const [errors, setErrors] = useState<Partial<FrmData>>({})

    /**
     * Handles changes in form input values.
     *
     * @param txt - The new value of the input.
     * @param name - The name of the input field being changed.
     */
    const handleChange = (txt: string, name: string) => {
        setFrmData({ ...frmData, [name]: txt })
    }

    /**
     * Handles form submission, validates input fields, and updates the password.
     * Displays error messages for missing or mismatched passwords.
     * Navigates to the profile tab and shows a success alert on password change.
     */
    const handleSubmit = async () => {
        const ERROR_MESSAGES: any = {
            current_password: 'El campo contraseña actual',
            new_password: 'El campo nueva contraseña',
            repeat_new_password: 'El campo repita la nueva contraseña'
        }
        const newErrors: Partial<any> = {}
        setErrors(newErrors)
        const form: any = frmData
        for (const field in ERROR_MESSAGES) {
            if ((typeof form[field] === "string" && !form[field].trim()) || !form[field]) newErrors[field] = `* ${ERROR_MESSAGES[field]} es requerido.`;
        }
        if (form.new_password !== form.repeat_new_password) newErrors['repeat_new_password'] = "* Las contraseñas no coinciden"
        if (!Object.keys(newErrors).length) {
            await setChangePassword({ current_password: form.current_password, password: form.new_password })
            router.replace('/tabs/profile')
            errorAlert("Contraseña Cambiada", "La contraseña se ha cambiado correctamente.")
        }
        setErrors(newErrors)
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Cambiar contraseña ' }} />
            <View style={Container.base}>
                <View style={[TextFiled.base, { marginTop: 20 }]}>
                    <Text style={TextFiled.text}>Contraseña actual:</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={TextFiled.textInput}
                        value={frmData.current_password}
                        placeholder="Escribe la contraseña actual..."
                        onChangeText={(txt) => handleChange(txt, 'current_password')}
                    />
                    {errors.current_password && <Text style={TextFiled.textError}>{errors.current_password}</Text>}
                </View>
                <View style={[TextFiled.base, { marginTop: 20 }]}>
                    <Text style={TextFiled.text}>Nueva contraseña:</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={TextFiled.textInput}
                        value={frmData.new_password}
                        placeholder="Escribe la nueva contraseña..."
                        onChangeText={(txt) => handleChange(txt, 'new_password')}
                    />
                    {errors.new_password && <Text style={TextFiled.textError}>{errors.new_password}</Text>}
                </View>
                <View style={[TextFiled.base, { marginTop: 20 }]}>
                    <Text style={TextFiled.text}>Repita la nueva contraseña:</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={TextFiled.textInput}
                        value={frmData.repeat_new_password}
                        placeholder="Repita la nueva contraseña..."
                        onChangeText={(txt) => handleChange(txt, 'repeat_new_password')}
                    />
                    {errors.repeat_new_password && <Text style={TextFiled.textError}>{errors.repeat_new_password}</Text>}
                </View>
                <View style={[TextFiled.base, { width: 210, alignSelf: "center", marginTop: 10 }]}>
                    <Button title="Guardar Cambios" icon="save" type="success" onPress={handleSubmit} />
                </View>
            </View>
        </>
    )
}

const mapDispatchToProps = () => ({
    ...UserAction
})

export default connect(null, mapDispatchToProps())(ChangePasswordLayout)