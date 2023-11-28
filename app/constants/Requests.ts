import axios from 'axios'
import { errorAlert } from './Alert'
import { router } from 'expo-router'

const url: any = process.env.EXPO_PUBLIC_API_URL

/**
 * Request to perform POST
 * @param {string} route 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const post = (route: string, params: object, token: string = ""): Promise<any> => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.post(url + route, params)
}

/**
 * Request to perform PATCH
 * @param {string} route 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const patch = (route: string, params: object): Promise<any> => {
    return axios.patch(url + route, params)
}

/**
 * Request to perform GET
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const get = (route: string, token: string = ""): Promise<any> => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.get(url + route)
}

/**
 * Request to perform DELETE
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const remove = (route: string, token: string = ""): Promise<any> => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return axios.delete(url + route)
}

/**
 * Handles 401 Unauthorized errors by triggering an alert for an expired session.
 *
 * @param {any} error - The error object, typically containing a response property.
 */
export const errorResponse = (error: any) => {
    const { response } = error
    if (response.status === 401) {
        errorAlert("Sesión caducado", "Su sesión ha caducado. Por favor, vuelva a iniciar sesión.")
        router.push({ pathname: "/", params: { status: "SignOff" } })
    }
}