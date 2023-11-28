import { configStage } from '../slices/Config'
import { votersStage } from '../slices/Voters'
import { errorResponse, get, post, remove } from '../../constants/Requests'
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
const getAllByCode = (code: string) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await get(`voter/list/${code}`, user.auth.token)
            dispatch(votersStage({ details: resp.data }))
            resolve(resp.data)
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

export default { getAllByCode, getTotal, setRemove, setVoter }