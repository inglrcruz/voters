import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from "redux-persist"
import { configSlice } from './slices/Config'
import { votersSlice } from './slices/Voters'
import { usrSlice } from './slices/User'

const persistConfig = {
    key: "vtrkey",
    version: 1,
    storage: AsyncStorage,
    blacklist: []
}

const reducer = combineReducers({
    config: configSlice.reducer,
    voters: votersSlice.reducer,
    user: usrSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;