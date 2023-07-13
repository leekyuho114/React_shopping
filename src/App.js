import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, Container,Nav, Navbar , Form, InputGroup} from 'react-bootstrap';
import data from './data.js'; //나중엔 database에서 가져오기
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './Pages/Detail.js'
import axios from 'axios';
function App() {
  let [pics, setPics] = useState(data);
  const [inputValue, setInputValue] = useState('');
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
          <Navbar.Brand onClick={()=>{navigate('/')}} className = "shop-logo" style={{ cursor: 'pointer' }}>옷</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About us</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
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
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res)=>{
                const newItems = res.data;
                setPics([...pics,...newItems]);
              })
              .catch(()=>{
                console.log('fail to get data');
              })
            }}>버튼</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
        <Route path="/detail/:id" element={<div><Detail pics = {pics} num={1}/></div>}/>
        <Route path="/about" element={<div><AboutUs/></div>}/>
        <Route path="/event" element={<div><Event/></div>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}

function Pictures(props){
  if(props.num>=0 && props.num<=2){
    return(
      <div className="col-md-4">
        <img  onClick={()=>{props.navigate('/detail/'+(props.num))}} src={process.env.PUBLIC_URL + '/img/row'+ (props.num+1) +'.jpg'} className = 'main-pics'/>
        <h4>{props.pics[props.num].title}</h4>
        <p>{props.pics[props.num].content}</p>
        <p>{props.pics[props.num].price}원</p>
      </div>
    );
  }
  else{
    return(
      <div className="col-md-4">
        <img  onClick={()=>{props.navigate('/detail/'+(props.num))}} src={process.env.PUBLIC_URL + '/img/row'+ (props.num+1) +'.jpg'} className = 'main-pics'/>
        <h4>{props.pics[props.num].title}</h4>
        <p>{props.pics[props.num].content}</p>
        <p>{props.pics[props.num].price}원</p>
      </div>
    );
  }
}

function AboutUs(){
  return(
    <>
      아직 안만들었습니다...
      그냥 옷팔아유
    </>
  );
}

function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  );
}
export default App;
