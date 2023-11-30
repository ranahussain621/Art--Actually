import authReducer from '../features/auth/authSlice'
import {configureStore} from '@reduxjs/toolkit'
import paymentReducer from '../features/auth/PaymentSlice'
import EventSlice from '../features/EventSlice'


export const store=configureStore({

    reducer:{
    auth:authReducer,
    payment:paymentReducer,
    event:EventSlice

    }
})

export default store