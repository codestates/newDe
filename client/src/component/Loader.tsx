import React from 'react';
import ReactLoading from 'react-loading';

interface LoaderProps {
    type:any
    color:string
}


function Loader({ type, color }:LoaderProps) {
    return (
    <div className= "contentWrap" >
        <div style={ { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }>
            <h2>정보를 불러오는 중... </h2> 
            <h2>창을 닫지 말아주세요.</h2 > 
            <ReactLoading type={ type } color = { color } height = { '80%'} width = { '80%'} />
        </div> 
    </div> 
    ); 
}

export default Loader;
