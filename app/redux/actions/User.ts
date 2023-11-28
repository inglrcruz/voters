import { configStage } from '../slices/Config'
import { usrStage } from '../slices/User'
import { get, post, patch, remove, errorResponse } from '../../constants/Requests'
import { errorAlert } from '../../constants/Alert'

/**
 * Sets authentication by dispatching an action to perform authentication.
 * @param form The form containing authentication details.
 * @returns A Promise that resolves with the authentication response.
 */
const setAuth = (form: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch(configStage({ loading: true }))
            const resp = await post(`auth`, { ...form, username: form.username.toLowerCase() })
            dispatch(usrStage({ auth: resp.data }))
            resolve(resp.data)
        } catch (error: any) {
            if (error?.response?.status === 401) {
                const { message } = error?.response?.data
                errorAlert("Error al autenticar", message)
            }
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }))
        }
    })
}

/**
 * Sets a change of password by dispatching an action to update the password.
 * @param form The form containing the current and new passwords.
 * @returns A Promise that resolves with a boolean indicating success.
 */
const setChangePassword = (form: any) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch(configStage({ loading: true }))
            await patch(`auth/change-password`, form)
            resolve(true)
        } catch (error: any) {
            if (error?.response?.status === 404) {
                const { message } = error?.response?.data
                errorAlert("Error al autenticar", message)
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
 * Gets the user profile by dispatching an action to retrieve it.
 * @returns A Promise that resolves with the user profile data.
 */
const getProfile = () => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await get(`user/profile`, user.auth.token)
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
 * Sets a new user by dispatching an action to create a user.
 * @param form The form containing user details.
 * @returns A Promise that resolves with a boolean indicating success.
 */
const setUser = (form: any) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await post(`user`, form, user.auth.token)
            dispatch(usrStage({ list: [...user.list, resp] }))
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
            dispatch(configStage({ loading: false }));
        }
    })
}

/**
 * Removes a user by dispatching an action to delete the user.
 * @param id The ID of the user to be removed.
 * @returns A Promise that resolves with a boolean indicating success.
 */
const setRemove = (id: string) => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            await remove(`user/${id}`, user.auth.token)
            const list = user.list.filter((i: any) => i._id !== id)
            dispatch(usrStage({ list: list || [] }))
            resolve(true)
        } catch (error: any) {
            errorResponse(error)
            reject(error)
        } finally {
            dispatch(configStage({ loading: false }));
        }
    })
}

/**
 * Gets the list of users by dispatching an action to retrieve it.
 * @returns A Promise that resolves with the list of users.
 */
const getList = () => async (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = getState()
            dispatch(configStage({ loading: true }))
            const resp = await get(`user/list`, user.auth.token)
            dispatch(usrStage({ list: resp.data }))
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
 * Signs off the user by dispatching an action to clear authentication data.
 */
const setSignOff = () => async (dispatch: any) => {
    dispatch(usrStage({ auth: null }))
}

export default { setAuth, setSignOff, getProfile, setChangePassword, getList, setUser, setRemove }