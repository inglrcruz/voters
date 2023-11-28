import { createSlice } from '@reduxjs/toolkit'

export const state = {
  list: [],
  details: []
}

export const votersSlice = createSlice({
  name: "voter",
  initialState: state,
  reducers: {
    votersStage: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { votersStage } = votersSlice.actions