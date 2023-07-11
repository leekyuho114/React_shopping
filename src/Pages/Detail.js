import {useParams} from "react-router-dom";
// import styled from 'styled-components';

// let YellowBtn = styled.button`
//   background : ${props => props.bg};
//   color : ${props =>  props.bg == 'blue' ? 'white' : 'black'};
//   padding : 10px;
// `

function Detail(props){

  let {id} = useParams();
  const pid = props.pics.findIndex(pic=>pic.id==id);
  if(id <= 2 && id>=0){
    return(
      <div className="container">
        {/* <YellowBtn bg = "blue">버튼</YellowBtn>
        <YellowBtn bg = "orange">버튼</YellowBtn> */}
      
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.pics[pid].title}</h4>
          <p>{props.pics[pid].content}</p>
          <p>120000원</p>
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