import { createSlice, createStore } from "@reduxjs/toolkit";

const cartslice=createSlice({

    name:'cartclick',
    initialState:{cartshown:false},
    reducers:{

        cartshow(state) {
            state.cartshown=!state.cartshown;

        }
    },
})

const store=createStore(cartslice.reducer);

export default store;

export const cartsliceactions=cartslice.actions;
