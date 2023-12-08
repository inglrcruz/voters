import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Image } from 'react-native';
import { Button, Text, View } from "../../components/Themed"
import { Container, TextFiled, TextLabel } from "../../constants/Styles"
import { TextInput } from "react-native"
import UserActions from '../../redux/actions/User'
import { router, useLocalSearchParams } from 'expo-router'
import { colorBase } from "../../constants/Colors";

type FrmTable = {
    username?: string
    password?: string
}

type AuthProps = {
    user: any,
    setAuth: (form: FrmTable) => void;
    setSignOff: () => void;
}

const SignInLayout = ({ user, setAuth, setSignOff }: AuthProps) => {

    const [frmData, setFrmData] = useState<FrmTable>({})
    const [errors, setErrors] = useState<Partial<FrmTable>>({})
    const [isMounted, setIsMounted] = useState(false)
    const { status } = useLocalSearchParams()

    /**
     * Sets the component as mounted when it renders for the first time.
     * Equivalent to componentDidMount in class components.
     */
    useEffect(() => {
        if (status === "SignOff") setSignOff()
        if (!isMounted) setIsMounted(true)
    }, [])

    /**
     * Redirects the user to '/tabs' if the component is mounted and
     * the user has a valid authentication token.
     */
    useEffect(() => {
        if (isMounted && user?.auth?.token) router.replace('/tabs')
    }, [isMounted])

    /**
     * Handles the change event for input fields.
     *
     * @param {string} txt - The new text value.
     * @param {string} name - The name of the field being updated.
     */
    const handleChange = (txt: string, name: string) => {
        setFrmData({ ...frmData, [name]: txt })
    }

    /**
     * Handles the form submission.
     * Validates the form fields and dispatches authentication if valid.
     */
    const handleSubmit = async () => {
        const ERROR_MESSAGES: any = {
            username: 'El campo nombre de usuario',
            password: 'El campo contraseña'
        }

        const newErrors: Partial<any> = {}
        const form: any = frmData

        for (const field in ERROR_MESSAGES) {
            if ((typeof form[field] === "string" && !form[field].trim()) || !form[field]) {
                newErrors[field] = `* ${ERROR_MESSAGES[field]} es requerido.`
            }
        }
        if (!Object.keys(newErrors).length) {
            await setAuth(frmData)
            router.replace('/tabs')
        }
        setErrors(newErrors)
    }

    return (
        <View style={{ backgroundColor: colorBase, flex: 1 }}>
            <View style={{ backgroundColor: 'transparent' }}>
                <Image style={Container.logo} source={require('../../assets/images/logo.jpg')} />
                <Text style={TextLabel.titleLogin}>Iniciar Sesión</Text>
                <Text style={TextLabel.titleLoginDesc}>
                    José Durán, Candidato a Regidor. 2024 - 2028
                </Text>
            </View>
            <View style={Container.login}>
                <View style={TextFiled.base}>
                    <Text style={TextFiled.text}>Nombre de Usuario:</Text>
                    <TextInput
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
                <View style={[TextFiled.base, { width: 250, alignSelf: "center", marginTop: 20 }]}>
                    <Button title="Iniciar Sesión" icon="sign-in" type="success" onPress={handleSubmit} />
                </View>
            </View>
            <Text style={TextLabel.footer}>
                © Copyright {new Date().getFullYear()} Todos los derechos reservados. Versión {process.env.EXPO_PUBLIC_VERSION}
            </Text>
        </View>
    )
}

const mapStateToProps = ({ user }: any) => ({
    user
})

const mapDispatchToProps = () => ({
    ...UserActions
})

export default connect(mapStateToProps, mapDispatchToProps())(SignInLayout)