import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, Container,Nav, Navbar } from 'react-bootstrap';
import data from './data.js'; //나중엔 database에서 가져오기
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  let [pics, setPics] = useState(data);
  return (
    <div className="App">

      <Navbar className = "color-nav" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className = "shop-logo">Blog</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">About us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <div className = "main-bg" style={{backgroundImage : 'url('+bg+')'}}></div> */}
      <Link to="/"> 홈 </Link>
      <Link to="/detail"> 상세 </Link>
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
                    <Pictures pics = {pics} num={i}/>
                    </>
                  )
                })
              }
            </div>
          </div>
          </>
        }/>
        <Route path="/detail" element={<div>상세페이지임</div>}/>
        <Route path="/about" element={<div>about페이지임</div>}/>
      </Routes>
      
    </div>
  );
}

function Pictures(props){
  return(
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/img/row'+ (props.num+1) +'.jpg'} width="80%" style={{ marginTop : '15px'}}/>
      <h4>{props.pics[props.num].title}</h4>
      <p>{props.pics[props.num].content}</p>
    </div>
  );
}

function Detail(){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
      <div className="col-md-6">
      <h4 className="pt-5">상품명</h4>
      <p>상품설명</p>
      <p>120000원</p>
      <button className="btn btn-danger">주문하기</button> 
    </div>
  </div>
</div> 
  );
}
export default App;
