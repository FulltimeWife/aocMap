import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import markerService from "./markerService"

const initialState = {
  markers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getAll = createAsyncThunk('/map', async(thunkAPI) => {
 try {
   return await markerService.getAll()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.markers = action.payload
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.markers = null
      })
  }
})

export const {reset} = markerSlice.actions
export default markerSlice.reducer