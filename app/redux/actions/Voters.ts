import { configStage } from '../slices/Config'
import { votersStage } from '../slices/Voters'
import { errorResponse, get, patch, post, remove } from '../../constants/Requests'
import { errorAlert } from '../../constants/Alert'

/**
 * Sets a new voter by making a POST request to the server.
 * 
 * @param form - The data to be sent in the request.
 * @param dispatch - The dispatch function for updating the state.
 * @returns {Promise} A Promise that resolves with the response data upon success, or rejects with an error.
 */
const setVoter = (form: any) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user, voters } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await post(`voter`, form, user.auth.token)
            dispatch(votersStage({ list: [...voters.list, resp] }))
            resolve(true)
        } catch (error: any) {
            if (error?.response?.status === 400) {
                const { message } = error?.response?.data
                errorAlert("Error al guardar", message)
            } else {
                errorResponse(error)
            }
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

/**
 * Updates a voter's information in the backend and updates the local state.
 *
 * @param id - The ID of the voter to update.
 * @param form - An object containing the updated voter information (full_name, address, ecid).
 * @returns A Promise that resolves to true if the update is successful, or rejects with an error.
 */
const setUpdVoter = (id: string, form: any) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user, voters } = getState()
            dispatch(configStage({ loading: true }))
            await patch(`voter/${id}`, form, user.auth.token)
            const details = voters.details.map((r: any) => {
                if (r._id === id) {
                    return {
                        ...r,
                        full_name: form.full_name,
                        address: form.address,
                        phone: form.phone,
                        ecid: form.ecid
                    }
                }
                return r
            })
            dispatch(votersStage({ details }))
            resolve(true)
        } catch (error: any) {
            if (error?.response?.status === 400) {
                const { message } = error?.response?.data
                errorAlert("Error al guardar", message)
            } else {
                errorResponse(error)
            }
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

/**
 * Removes a voter by making a DELETE request to the server.
 * 
 * @param id - The ID of the voter to be removed.
 * @param token - The authentication token.
 * @param dispatch - The dispatch function for updating the state.
 * @returns {Promise} A Promise that resolves with the response data upon success, or rejects with an error.
 */
const setRemove = (id: string) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user, voters } = getState()
            dispatch(configStage({ loading: true }))
            await remove(`voter/${id}`, user.auth.token)
            const details = voters.details.filter((i: any) => i._id !== id)
            dispatch(votersStage({ details: details || [] }))
            resolve(true)
        } catch (error: any) {
            errorResponse(error)
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

/**
 * Retrieves all voters with a specific code by making a GET request to the server.
 * 
 * @param code - The code used to filter voters.
 * @param token - The authentication token.
 * @param dispatch - The dispatch function for updating the state.
 * @returns {Promise} A Promise that resolves with the response data upon success, or rejects with an error.
 */
const getAllByCode = (code: string, usr: any = "") => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const params = (usr) ? `${code}/${usr}` : `${code}`
            const resp = await get(`voter/list/${params}`, user.auth.token)
            const list = resp.data.reverse()
            dispatch(votersStage({ details: list }))
            resolve(list)
        } catch (error: any) {
            errorResponse(error)
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

/**
 * Retrieves the total number of voters by making a GET request to the server.
 * 
 * @param token - The authentication token.
 * @param dispatch - The dispatch function for updating the state.
 */
const getTotal = () => async (dispatch: any, getState: any) => {
    try {
        const { user } = getState()
        dispatch(configStage({ loading: true }))
        const resp = await get(`voter/total`, user.auth.token)
        dispatch(votersStage({ list: resp.data }))
    } catch (error: any) {
        errorResponse(error)
    } finally {
        dispatch(configStage({ loading: false }))
    }
}

/**
 * Fetches the total for a specific user identified by UID.
 * 
 * @param {string} uid - User ID for which the total is requested.
 * @returns {Promise} A Promise that resolves with the total data or rejects with an error.
 */
const getTotalByUser = (uid: string) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await get(`voter/total/${uid}`, user.auth.token)
            resolve(resp.data)
        } catch (error: any) {
            reject(error)
            errorResponse(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

export default { getAllByCode, getTotal, getTotalByUser, setRemove, setVoter, setUpdVoter }