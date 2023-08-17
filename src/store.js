import { configureStore , createSlice} from '@reduxjs/toolkit'


let stock = createSlice({ // useState와 같은 역할
    name:'stock',
    initialState: [10,11,12] // 상품 재고
})

export default configureStore({
  reducer: { 
    stock : stock.reducer
  }
})