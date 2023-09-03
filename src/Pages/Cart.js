import { Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName , plusAge} from '../store/userSlice.js';
import { increaseCount } from '../store';
import { useState } from 'react';
import { memo } from 'react';
import { useMemo } from 'react';

function Cart(){// 표 형식으로 장바구니 만들거임
    let state = useSelector((state)=>{return state})
    let data = useSelector((state)=>{return state.cartData});
    let dispatch = useDispatch();

    return(
        <>
          <h4 style={{marginBottom:'30px', marginTop:'30px',marginLeft:'30px', textAlign: 'left'}}>{state.user.name} 님의 Order/Paymet</h4>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>변경하기</th>
                </tr>
              </thead>
              <tbody> 
                  {
                    data.map(function(a,i){
                      return(
                        <>
                          <tr> {/* tr은 행임 */}
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.count}</td>
                            <td>
                              <button onClick={()=>{
                                dispatch(increaseCount(a.id))
                              }}>+</button>
                            </td>
                          </tr>
                        </>
                      )
                    }
                    )               
                  }
              </tbody>
            </Table> 
        </>
    );
}
export default Cart;