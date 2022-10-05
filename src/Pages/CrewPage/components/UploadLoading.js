import styled from "styled-components";
import loadingSpinner from '../../../Image/로딩스피너.gif'

const Loading = () => {
    return (
        <div style={{width:'22%', height:'100%', backgroundColor:'#141414'}}>
            <LoadingSpinner>
                <img src={loadingSpinner} alt="로딩중" width="5%"/>
            </LoadingSpinner>
        </div>
    );
}

const LoadingSpinner = styled.div`
width: 100%;
margin: 0 auto;
background: #141414;
z-index: 999;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const LoadingText = styled.div`
font: 1rem 'Noto Sans KR';
text-align: center;
color: #ffffff;
`

export default Loading;