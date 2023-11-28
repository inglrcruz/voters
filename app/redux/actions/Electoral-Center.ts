import { errorResponse, get } from "../../constants/Requests"
import { configStage } from "../slices/Config"

/**
 * Retrieves a list of electoral centers. This asynchronous action is designed to be used with Redux and Redux Thunk.
 *
 * @returns {Promise} A promise that resolves with the data of the electoral center list if successful,
 *                    or rejects with an error object if an error occurs during the process.
 */
const getListElectCenter = () => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await get(`electoral-center/list`, user.auth.token)
            resolve(resp.data)
        } catch (error: any) {
            errorResponse(error)
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }));
        }
    })
}

export default { getListElectCenter }