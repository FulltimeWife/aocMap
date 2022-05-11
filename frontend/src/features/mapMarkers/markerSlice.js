import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import markerService from "./markerService"

const initialState = {
  markers: [],
  newMarkers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getAll = createAsyncThunk('getAll', async(thunkAPI) => {
 try {
   return await markerService.getAll()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const sendAll = createAsyncThunk('sendAll', async(newMarkers, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await markerService.sendAll(newMarkers, token)
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
      .addCase(sendAll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.newMarkers = localStorage
      })
      .addCase(sendAll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.markers = null
      })
  }
})

export const {reset} = markerSlice.actions
export default markerSlice.reducer