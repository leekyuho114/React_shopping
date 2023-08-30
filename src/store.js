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
        increaseCount(state, action){ // 장바구니 변경 기능
            const id = action.payload;
            const index = state.findIndex(item=>
                item.id == id
            )
            state[index].count += 1;
        },
        orderNew(state, action){//cartData 객체에 존재하지 않는 상품일 경우
            const {item , count} = action.payload;
            console.log(item, count);
            return [...state , { id : item.id, name : item.title , count: count }];
        },
        orderOld(state, action){
            const {id, input} = action.payload; // 장바구니에 추가되는 상품의 id와 추가되는 개수
            const index = state.findIndex(item=>//id에 해당하는 index 찾기, item 변수명은 아무거나 써도됨
                item.id == id
            )
            console.log(input);
            state[index].count += input; //추가
        }
    }
});
export let {increaseCount, orderNew, orderOld} = cartData.actions;


export default configureStore({
  reducer: {
    user : user.reducer, 
    stock : stock.reducer,
    cartData : cartData.reducer
    }
})