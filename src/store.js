import { configureStore , createSlice} from '@reduxjs/toolkit';
import user from './store/userSlice.js'

let stock = createSlice({ // useState와 같은 역할
    name:'stock',
    initialState: [10,11,12] // 상품 재고
});

let cartData = createSlice({
    name : 'cartData' ,
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers:{
        increaseCount(state, id){
            const index = state.findIndex(state=>
                state.id == id
            )

            state[index].count += 1;
            
        }
    }
});
export let {increaseCount} = cartData.actions;


export default configureStore({
  reducer: {
    user : user.reducer, 
    stock : stock.reducer,
    cartData : cartData.reducer
    }
})