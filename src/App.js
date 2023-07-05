import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, Container,Nav, Navbar } from 'react-bootstrap';
import data from './data.js'; //나중엔 database에서 가져오기

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
    </div>
  );
}

function Pictures(props){
  return(
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/img/row'+ props.num +'.jpg'} width="80%" style={{ marginTop : '15px'}}/>
      <h4>{props.pics[props.num].title}</h4>
      <p>{props.pics[props.num].content}</p>
    </div>
  );
}
export default App;
