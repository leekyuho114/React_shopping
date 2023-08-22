import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Form, InputGroup} from 'react-bootstrap';
import './Detail.css';
import {Context1} from './../App.js'
import { useDispatch, useSelector } from 'react-redux';
import { orderNew, orderOld } from '../store';
import './../App.css'
function Detail(props){

  useContext(Context1);//context api

  let data = useSelector((state)=>{return state.cartData});//주문시 장바구니에 개수 추가 기능 구현
  let dispatch = useDispatch();

  useEffect(()=>{//2초이내 구매시 할인 구현
    let a = setTimeout(()=>{setSale(false)},2000)
    return ()=>{
      clearTimeout(a);
    }
  },[])

  let [sale, setSale] = useState(true);
  let [nan, setNan] = useState(true);
  let [tabNumber, setTabNumber] = useState(0);//0: 상세정보, 1: 리뷰, 2:QnA, 3: 반품/교환
  let {id} = useParams(); // detail id
  let [fade2, setFade] = useState('');//fade로 애니메이션 end 넣을거임
  useEffect(()=>{
    let a = setTimeout(()=>{
      setFade('end');
    },100)
    return ()=>{
      clearTimeout(a);
			setFade('');
		}
  },[id])
  let nextId = parseInt(id,10) +1;
  const pid = props.pics.findIndex(pic=>pic.id==id);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => { 
    setInputValue(event.target.value);

  };

  const handleKeyDown = () => { // 주문하기 시에 다른 문자 예외처리, 수인 경우 다시 ''로 set
    if (isNaN(inputValue) || inputValue.trim() === '') {
      alert('수량을 입력해주세요.');
    setInputValue('');
    }
    else{//제대로 입력된 경우 장바구니 추가
      const input = parseInt(inputValue,10);//받은 주문량 int로 변환
      const findId = data.findIndex(data=>
        data.id == id //id는 현재 id, data.id는 cartdata
      )
      if(findId == -1){ //장바구니에 해당 상품이 없을 경우
        dispatch(orderNew({item : props.pics[pid], count : input}));
        alert('장바구니에 추가되었습니다.');
      }
      else{// 장바구니에 해당 상품이 있을 경우
        dispatch(orderOld({id, input}));
        alert('장바구니에 추가되었습니다.');
      }
    }
  };
  if(id <= 6 && id>=0){
    return(
      <div className={"container start " + fade2 }>
        {
          sale == true ?
          <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div> : null
        }
        <div className="row">
          <div className="col-md-6">
          <img src={'http://codingapple1.github.io/shop/shoes'+ nextId +'.jpg'} className = 'main-pics'/>
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.pics[pid].title}</h4>
            <p>{props.pics[pid].content}</p>
            <p>{props.pics[pid].price}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InputGroup className="mb-3" style={{ maxWidth: '70%' }}>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    수량
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={inputValue}
                    onChange={handleInputChange}
                    // onKeyDown={handleKeyDown}
                  />
                </InputGroup>
              </div>
            <button 
              className="btn btn-danger"
              onClick={handleKeyDown}  
            >주문하기</button>
          </div>
        </div>
        <div className="row">
          <div className="tab-container">
            <button onClick={()=>{setTabNumber(0)}}>상세정보</button>
            <button onClick={()=>{setTabNumber(1)}}>리뷰</button>
            <button onClick={()=>{setTabNumber(2)}}>Q&A</button>
            <button onClick={()=>{setTabNumber(3)}}>반품/교환</button>
          </div>
        </div>
        <Tab tabNumber = {tabNumber} pics = {props.pics}/>
      </div> 
    );
  }
  else{
    return <h1>404 Error: Page Not Found</h1>;
  }
}

function Tab(props){
  let [fade, setFade] = useState('');//fade로 애니메이션 end 넣을거임
  useEffect(()=>{
    let a = setTimeout(()=>{
      setFade('end');
    },100)
    return ()=>{
      clearTimeout(a);
			setFade('');
		}
  },[props.tabNumber])
  return( <div className={'start ' + fade}>
      {[<div>상세정보</div>,<div>리뷰</div>,<div>큐엔에이</div>,<div>반품교환</div>][props.tabNumber]}
    </div>)
  // if(props.tabNumber == 0 ){
  //   return(
  //     <>
  //       {props.pics[0].title}
  //     </>
  //   );
  // }
  // else if(props.tabNumber == 1 ){
  //   return(
  //     <>
  //       {props.tabNumber}
  //     </>
  //   );
  // }
  // else if(props.tabNumber == 2 ){
  //   return(
  //     <>
  //       {props.tabNumber}
  //     </>
  //   );
  // }
  // else if(props.tabNumber == 3 ){
  //   return(
  //     <>
  //       {props.tabNumber}
  //     </>
  //   );
  // }
}
export default Detail;