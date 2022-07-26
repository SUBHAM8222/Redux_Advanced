import { configureStore, createSlice } from "@reduxjs/toolkit";



const cartsslice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      totalQuantity: 0,
      change:false,
    },
    reducers: {
      replaceCart(state, action) {
        state.totalQuantity = action.payload.totalQuantity;
        state.items = action.payload.items;
        state.change=true;
      },
     
      addItemToCart(state, action) {
        const newItem = action.payload;
        const existingItem = state.items.find((item) => item.id === newItem.id);
        state.totalQuantity++;
        state.change = true;
        if (!existingItem) {
          state.items.push({
            id: newItem.id,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            name: newItem.title,
          });
        } else {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        }
      },
      removeItemFromCart(state, action) {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        state.totalQuantity--;
        
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      },
    }})
const cartslice=createSlice({

    name:'cartclick',
    initialState:{cartshown:false,notification:null},
    reducers:{

        cartshow(state) {
            state.cartshown=!state.cartshown;

        },
        showNotification(state, action) {
          state.notification = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
        }
      }
    },
})

const store=configureStore({
  reducer:{cartclick:cartslice.reducer,cart:cartsslice.reducer}
});

export default store;

export const cartsliceactions=cartslice.actions;
export const cartsslicesactions=cartsslice.actions;