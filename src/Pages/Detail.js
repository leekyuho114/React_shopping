import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Form, InputGroup} from 'react-bootstrap';
import './Detail.css';
function Detail(props){
  useEffect(()=>{
    let a = setTimeout(()=>{setSale(false)},2000)
    return ()=>{
      clearTimeout(a);
    }
  },[])
  let [sale, setSale] = useState(true);
  let [nan, setNan] = useState(true);
  let [tabNumber, setTabNumber] = useState(0);//0: 상세정보, 1: 리뷰, 2:QnA, 3: 반품/교환
  let {id} = useParams();
  let nextId = parseInt(id,10) +1;
  const pid = props.pics.findIndex(pic=>pic.id==id);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (isNaN(inputValue) || inputValue.trim() === '') {
        alert('수량을 입력해주세요.');
      }
      setInputValue('');
    }
  };
  if(id <= 6 && id>=0){
    return(
      <div className="container">
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
            <p>120000원</p>
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
                    onKeyDown={handleKeyDown}
                  />
                </InputGroup>
              </div>
            <button className="btn btn-danger">주문하기</button>
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
        <Tab tabNumber = {tabNumber}/>
      </div> 
    );
  }
  else{
    return <h1>404 Error: Page Not Found</h1>;
  }
}

function Tab(props){
  if(props.tabNumber == 0 ){
    return(
      <>
        {props.tabNumber}
      </>
    );
  }
  else if(props.tabNumber == 1 ){
    return(
      <>
        {props.tabNumber}
      </>
    );
  }
  else if(props.tabNumber == 2 ){
    return(
      <>
        {props.tabNumber}
      </>
    );
  }
  else if(props.tabNumber == 3 ){
    return(
      <>
        {props.tabNumber}
      </>
    );
  }
}
export default Detail;