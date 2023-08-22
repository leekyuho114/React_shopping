import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { createContext } from 'react';
import { Button, Container,Nav, Navbar , Form, InputGroup} from 'react-bootstrap';
import data from './data.js'; //나중엔 database에서 가져오기
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './Pages/Detail.js'
import Cart from './Pages/Cart.js'

import axios from 'axios';
export let Context1 = createContext();
function App() {
  let [pics, setPics] = useState(data);
  const [inputValue, setInputValue] = useState('');
  let [moreview, setMoreview] = useState(2); // 더보기를 위한 state 
  let [loading, setLoading] = useState(false); //로딩중입니다 띄우기위한 state
  let [shoeLeft, setShoeLeft] = useState(10,11,12);// 재고 정보


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setInputValue('');
    }
  };
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar className = "color-nav" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}} className = "shop-logo" style={{ cursor: 'pointer' }}>신발팜</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About us</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <div className = "main-bg" style={{backgroundImage : 'url('+bg+')'}}></div> */}
      
      <Routes>
        <Route path="/" element={
          <>
            <div className = "main-bg"></div>
            <div className="container">
              <div className ="row">
                {
                  pics.map(function(a,i){
                    return(
                      <>
                      <Pictures pics = {pics} num={i} navigate = {navigate}/>
                      </>
                    )
                  })
                }
              </div>
            </div>
            {
              loading == true ? <div style={{marginTop : '50px', fontWeight:'bolder'}}>로딩중입니다</div> : null
            }
            <button onClick={()=>{
              if(moreview<=3){
                setLoading(true);
                axios.get('https://codingapple1.github.io/shop/data'+(moreview) + '.json')
                .then((res)=>{
                  console.log(res);
                  const newItems = res.data;
                  setPics([...pics,...newItems]);//array에 추가
                })
                .catch(()=>{
                  console.log('fail to get data');
                })
                setLoading(false);
                setMoreview(moreview+1);
              }
              else{
                alert('더 이상 상품이 존재하지 않습니다.');
              }
            }}
              style={{marginTop:'30px'}}
              className='more-button'
            >more</button>
            <div style={{ marginTop:'30px', display: 'flex', justifyContent: 'center' }}>
              <InputGroup className="mb-3" style={{ maxWidth: '70%' }}>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Search
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
          </>
        }/>
        <Route path="/detail/:id" element={
        <div>
          <Context1.Provider value={{shoeLeft, pics}}>
            <Detail pics = {pics} num={1} />
          </Context1.Provider>
        </div>}/>

        <Route path="/cart" element={<div><Cart/></div>}/>

        <Route path="/about" element={<div><AboutUs/></div>}/>
        <Route path="/event" element={<div><Event/></div>}>
          <Route path="one" element={<div>첫 주문시 할인쿠폰 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}

function Pictures(props){
  if(props.num>=0 && props.num<=6){
    return(
      <div className="col-md-4">
        {/* <img  onClick={()=>{props.navigate('/detail/'+(props.num))}} src={process.env.PUBLIC_URL + '/img/row'+ (props.num+1) +'.jpg'} className = 'main-pics'/> */}
        <img  onClick={()=>{props.navigate('/detail/'+(props.num))}} src={'http://codingapple1.github.io/shop/shoes'+ (props.num+1) +'.jpg'} className = 'main-pics'/>
        <h4>{props.pics[props.num].title}</h4>
        <p>{props.pics[props.num].content}</p>
        <p>{props.pics[props.num].price}원</p>
      </div>
    );
  }
  else{
    // return(
    //   <div className="col-md-4">
    //     <img  onClick={()=>{props.navigate('/detail/'+(props.num))}} src={process.env.PUBLIC_URL + '/img/row'+ (props.num+1) +'.jpg'} className = 'main-pics'/>
    //     <h4>{props.pics[props.num].title}</h4>
    //     <p>{props.pics[props.num].content}</p>
    //     <p>{props.pics[props.num].price}원</p>
    //   </div>
    // );
  }
}

function AboutUs(){
  return(
    <>
      Not designed
    </>
  );
}

function Event(){ //outlet은 자식 Route들이 렌더링될 위치 지정
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>  
    </>
  );
}
export default App;
