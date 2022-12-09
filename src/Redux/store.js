import { configureStore } from '@reduxjs/toolkit';
import CarParkingSlice from './carReducer';

export default configureStore({
    reducer: {
        CarSlice: CarParkingSlice

    },
});