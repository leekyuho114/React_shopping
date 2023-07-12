import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Form, InputGroup} from 'react-bootstrap';
function Detail(props){
  useEffect(()=>{
    let a = setTimeout(()=>{setSale(false)},2000)
    return ()=>{
      clearTimeout(a);
    }
  },[])
  let [sale, setSale] = useState(true);
  let [nan, setNan] = useState(true);
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
  if(id <= 2 && id>=0){
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
            <img src={process.env.PUBLIC_URL + '/img/row'+ nextId +'.jpg'} width="100%" />
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
      </div> 
    );
  }
  else{
    return <h1>404 Error: Page Not Found</h1>;
  }
}
export default Detail;