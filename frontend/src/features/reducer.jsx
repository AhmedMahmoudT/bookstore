import { createSlice } from "@reduxjs/toolkit"

const initState = {orders:localStorage.getItem('orders') !== null ? JSON.parse(localStorage.getItem('orders')):[]}

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addBook: (state, action) => {
      state.orders.push({ _id: action.payload._id, quantity: 1, totalPrice: action.payload.price, book:action.payload })
      localStorage.setItem('orders', JSON.stringify(state.orders.map(order => order)))
    },
    removeBook: (state, action) => {
      state.orders = state.orders.filter(o => o._id != action.payload)
      localStorage.setItem('orders', JSON.stringify(state.orders.map(order => order)))
    },
    incrementQnt: (state, action) => {
      const orders = state.orders.find(o => o._id == action.payload)
      if (orders && orders.quantity < orders.book.availableCopies) {
        orders.quantity++
        orders.totalPrice = orders.book.price * orders.quantity
        localStorage.setItem('orders', JSON.stringify(state.orders.map(order => order)))
      }
    },
    decrementQnt: (state, action) => {
      const orders = state.orders.find(o => o._id == action.payload)
      if (orders && orders.quantity > 1) {
        orders.quantity--
        orders.totalPrice = orders.book.price * orders.quantity
        localStorage.setItem('orders', JSON.stringify(state.orders.map(order => order)))
      }
    },
    emptyCart: (state) => {
      state.orders = []
      localStorage.removeItem('orders')
    }
  }
})

export const { addBook, removeBook, incrementQnt, decrementQnt, emptyCart } = cartSlice.actions
export default cartSlice.reducer