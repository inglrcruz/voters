import { createSlice } from '@reduxjs/toolkit'

export const state = {
  loading: false
}

export const configSlice = createSlice({
  name: "config",
  initialState: state,
  reducers: {
    configStage: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { configStage } = configSlice.actions