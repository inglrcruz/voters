import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import VotersAction from '../../redux/actions/Voters'
import ElectoralCenterAction from '../../redux/actions/Electoral-Center'
import { router } from 'expo-router'
import { Container, TextFiled } from '../../constants/Styles'
import { Button, Text, View } from '../../components/Themed'

type FrmTable = {
    full_name?: string
    identification_card?: string
    address?: string
    ecid?: string
}

type LstElectTable = {
    _id?: string
    code?: string
    description?: string
}

type VoteProps = {
    setVoter: (form: FrmTable) => void;
    getListElectCenter: () => void;
}

const AddVoterLayout = ({ setVoter, getListElectCenter }: VoteProps) => {

    const [frmData, setFrmData] = useState<FrmTable>({})
    const [errors, setErrors] = useState<Partial<FrmTable>>({})
    const [lstElecTable, setLstElecTable] = useState<LstElectTable[]>([])

    /**
     * useEffect hook to fetch and set the list of electoral centers.
     */
    useEffect(() => {
        async function fetchData() {
            const resp: any = await getListElectCenter()
            setLstElecTable(resp)
        }
        fetchData()
    }, [])

    /**
     * Handles the change event for form input fields.
     * 
     * @param {string} txt - The new text value.
     * @param {string} name - The name of the field being updated.
     */
    const handleChange = (txt: string, name: string) => {
        setFrmData({ ...frmData, [name]: txt })
    }

    /**
     * Handles the form submission, validates form data, sets errors, and, if no 
     * errors, sets the voter and redirects to '/tabs'.
     */
    const handleSubmit = async () => {
        const ERROR_MESSAGES: any = {
            full_name: 'El nombre completo',
            identification_card: 'La cédula',
            address: 'La dirección',
            ecid: 'La mesa electoral'
        }
        const newErrors: Partial<any> = {}
        setErrors(newErrors)
        const form: any = frmData
        for (const field in ERROR_MESSAGES) {
            if ((typeof form[field] === "string" && !form[field].trim()) || !form[field]) newErrors[field] = `* ${ERROR_MESSAGES[field]} es requerido.`;
        }
        if (!Object.keys(newErrors).length) {
            await setVoter(frmData)
            router.replace('/tabs')
        }
        setErrors(newErrors)
    }

    return (
        <View style={Container.base}>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Nombre Completo:</Text>
                <TextInput
                    style={TextFiled.textInput}
                    value={frmData.full_name}
                    placeholder="Escribe el nombre de la votante..."
                    onChangeText={(txt) => handleChange(txt, 'full_name')}
                />
                {errors.full_name && <Text style={TextFiled.textError}>{errors.full_name}</Text>}
            </View>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Cédula:</Text>
                <TextInput
                    keyboardType="numeric"
                    maxLength={11}
                    style={TextFiled.textInput}
                    value={frmData.identification_card}
                    placeholder="###-#######-#"
                    onChangeText={(txt) => handleChange(txt, 'identification_card')}
                />
                {errors.identification_card && <Text style={TextFiled.textError}>{errors.identification_card}</Text>}
            </View>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Dirección:</Text>
                <TextInput
                    multiline
                    numberOfLines={2}
                    style={TextFiled.textInput}
                    value={frmData.address}
                    placeholder="Escribe la dirección de la votante..."
                    onChangeText={(txt) => handleChange(txt, 'address')}
                />
                {errors.address && <Text style={TextFiled.textError}>{errors.address}</Text>}
            </View>
            <View style={TextFiled.base}>
                <Text style={TextFiled.text}>Mesa Electoral:</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Picker
                        placeholder="Seleccione la mesa electoral..."
                        selectedValue={frmData.ecid}
                        onValueChange={(val) => handleChange(val, 'ecid')}>
                        <Picker.Item style={{ color: "#9f9f9f", fontSize: 14 }} label="Seleccione la mesa electoral..." value="" />
                        {lstElecTable && lstElecTable.map((row: LstElectTable, key: number) => <Picker.Item key={key} value={row._id} label={row.code + " - " + row.description} />)}
                    </Picker>
                </View>
                {errors.ecid && <Text style={TextFiled.textError}>{errors.ecid}</Text>}
            </View>
            <View style={[TextFiled.base, { width: 150, alignSelf: "center", marginTop: 10 }]}>
                <Button title="Guardar" icon="check" type="success" onPress={handleSubmit} />
            </View>
        </View>
    )
}

const mapDispatchToProps = () => ({
    ...VotersAction,
    ...ElectoralCenterAction
})

export default connect(null, mapDispatchToProps())(AddVoterLayout)