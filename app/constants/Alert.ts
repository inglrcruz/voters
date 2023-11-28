import { Alert } from "react-native";

/**
 * Displays an error alert with the given title and body.
 *
 * @param {string} title - The title of the error alert.
 * @param {string} body - The body content of the error alert.
 * @param {string} [buttonText='Aceptar'] - The text for the confirmation button (default is 'Aceptar').
 */
export const errorAlert = (title: string, body: string, buttonText = 'Aceptar') => {
    Alert.alert(title, body, [{ text: buttonText }], { cancelable: false });
}

/**
 * Displays a confirmation alert with the given title, body, and options.
 *
 * @param {string} title - The title of the confirmation alert.
 * @param {string} body - The body content of the confirmation alert.
 * @param {any} options - The options for the confirmation alert.
 */
export const confirmAlert = (title: string, body: string, options: any) => {
    Alert.alert(title, body, options, { cancelable: false });
}
