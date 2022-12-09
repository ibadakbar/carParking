import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


import axios from "axios"
export const addCar = createAsyncThunk('addCar', async (regData, { rejectWithValue }) => {
    // debugger
    try {
        const response = await axios.post(`http://192.168.0.107:5000/api/post`, regData);
        const data = await response.data;
        return data
    } catch (error) {
        rejectWithValue(error)
        toast.error(error.response.data.error)

    }
});


export const getParkingCar = createAsyncThunk('getParkingCar', async () => {
    try {
        const response = await axios.get(`http://192.168.0.107:5000/api/getParkingCar`);
        const data = await response.data;
        return data
    } catch (error) {
        console.log(error);
    }
});


export const parkingCarStatus = createAsyncThunk('parkingCarStatus', async (carData, { rejectWithValue }) => {
    try {

        const response = await axios.post(`http://192.168.0.107:5000/api/updateCarStatus`, carData);
        const data = await response.data;
        return data
    } catch (error) {
        rejectWithValue(error)
    }
});
// const filterState = []

export const CarParkingSlice = createSlice({
    name: 'carData',
    initialState: [],
    reducers: {
        filterCar: (state, action) => {
            // console.log(state);
            // return state.filter((val) => {

            //     return val.numPlate == action.payload ||
            //         val.owner == action.payload ||
            //         val.phone == action.payload;
            // })
        },

    },
    extraReducers: {
        [getParkingCar.fulfilled]: (state, action) => action.payload,
    },
})

// this is for dispatch
export const { filterCar } = CarParkingSlice.actions;

// this is for configureStore
export default CarParkingSlice.reducer;