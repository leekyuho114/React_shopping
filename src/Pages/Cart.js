import { Table} from 'react-bootstrap';
import { useSelector } from 'react-redux';
function Cart(){// 표 형식으로 장바구니 만들거임

    let a = useSelector((state)=>{return state.stock});
    console.log(a.stock);
    return(
        <>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>상품명</th>
                  <th>{a}</th>
                  <th>변경하기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>안녕</td>
                  <td>안녕</td>
                  <td>안녕</td>
                </tr>
              </tbody>
            </Table> 
        </>
    );
}
export default Cart;