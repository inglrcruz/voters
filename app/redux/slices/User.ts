import { createSlice } from '@reduxjs/toolkit'

export const state = {
  auth: null, 
  list: []
}

export const usrSlice = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    usrStage: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { usrStage } = usrSlice.actions