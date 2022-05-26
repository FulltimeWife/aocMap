import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import zoneService from "./zoneService"

const initialState = {
  zone: [],
  subZones: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getZone = createAsyncThunk('getZone', async(thunkAPI) => {
  try {
    return await zoneService.getZone()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const markerSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getZone.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getZone.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.zone = action.payload
      })
      .addCase(getZone.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.zone = null
      })
  }
})

export const {reset} = markerSlice.actions
export default markerSlice.reducer