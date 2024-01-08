import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface AuthState {
    user: object
}

// Define the initial state using that type
const initialState: AuthState = {
    user: {
        email: 'nai'
    },
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<object>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = {}
        }
    },
})

export const { login , logout} = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const useAuth = (state: RootState) => state.auth.user

export default authSlice.reducer