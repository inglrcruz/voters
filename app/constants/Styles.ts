import { Dimensions, StyleSheet } from "react-native";

const window = Dimensions.get('window')

/**
 * Styles for the main container components.
 */
export const Container = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: "#f9fafc",
        padding: 10
    },
    headTotal: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        borderStyle: "dashed",
        paddingBottom: 5,
        marginBottom: 10,
        backgroundColor: "transparent"
    },
    people: {
        padding: 10,
        margin: 5,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#ffc107"
    },
    table: {
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#ffc107"
    },
    voterLine: {
        borderLeftWidth: 1,
        borderLeftColor: "#ddd",
        borderStyle: "dashed"
    },
    login: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 10,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 30,
        marginBottom: 10,
        alignSelf: "center"
    },
    profile: {
        width: 150,
        height: 150,
        borderRadius: 200 / 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#e7eaf3'
    },
    separator: {
        backgroundColor: 'transparent',
        alignSelf: "center",
        marginTop: 15
    },
    address: {
        marginTop: 10,
        paddingTop: 5,
        borderTopWidth: 1,
        borderColor: "#ddd",
        borderStyle: "dashed"
    },
    noRecords: {
        flex: 1,
        height: window.height - 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    }
})

/**
 * Styles for text field components.
 */
export const TextFiled = StyleSheet.create({
    base: {
        padding: 5,
        backgroundColor: 'transparent'
    },
    text: {
        fontWeight: "bold"
    },
    textError: {
        color: "#dc3545"
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
        backgroundColor: "#fff"
    }
})

/**
 * Styles for text label components.
 */
export const TextLabel = StyleSheet.create({
    titleHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5
    },
    titleDesc: {
        fontSize: 15,
        textTransform: 'capitalize'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 13
    },
    titleLogin: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    titleLoginDesc: {
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
        width: 220,
        marginTop: 5,
        alignSelf: "center"
    },
    footer: {
        width: 250,
        textAlign: "center",
        fontSize: 12,
        color: "#fff",
        alignSelf: "center"
    },
    votersLabel: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 13
    }
})

/**
 * Styles for button components.
 */
export const Btn = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 7,
        elevation: 2,
        backgroundColor: '#fff'
    },
    baseSm: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 7,
        elevation: 2
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        marginLeft: 10,
        letterSpacing: 0.25,
        color: '#333'
    },
    textSm: {
        fontSize: 13,
        letterSpacing: 0.25,
        color: '#333'
    }
})