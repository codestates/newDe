import styled from 'styled-components';

// import react, { useEffect } from 'react'

const NavBarContainer = styled.div`
display:flex;
`
const PageBtn = styled.button`
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #d3d3d3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: #fbfbfb;
    transition: all 0.5s;
    margin-bottom: 15px;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
`
const NowPageBtn = styled.button`
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #d3d3d3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: lightgray;
    transition: all 0.5s;
    margin-bottom: 15px;
    &:hover {
      cursor: pointer;
      outline: none;
      color: black;
    }
`

const SkipSec = styled.div`
margin: 7px 7px 0 7px;
`

interface PageNavprops {
    nowpage: number
    maxpage: number
    pagehandler : (el:number)=> void

}
function PageNav(props: PageNavprops):JSX.Element {

    //props.maxpage에 따라서 네비게이션 바 구분
    //maxpage가 1일 경우 : 페이지 네비게이션 바 필요없음
    //maxpage가 1 이상일 경우 현재 페이지 아래, 위 2개씩 버튼 및 처음 끝 버튼 렌더링 
    //maxpage 가 5이하일 경우 : 모두 렌더링 ... 생략 필요 없음 
    //maxpage가 5 초과일 경우 : ...생략 필요 이하는 5초과의 경우 
    //nowpage가 3 이하일경우 : 앞 ... 생략 필요 
    //nowpage가 maxpage-2 이상일 경우 뒤 ... 생략 필요
    //그 이외의 경우 1 ... nowpage-2 nowpage-1 nowpage nowpage +1 nowpage +2 ... maxpage 버튼을 만들어주자 
    // console.log(props)

    const btnclickhandler = (event:React.MouseEvent<HTMLButtonElement>) =>{
        console.log((event.target as HTMLLIElement).textContent)
        props.pagehandler(Number((event.target as HTMLLIElement).textContent))

    }
  



    if(props.maxpage < 2){
        return (
            <div></div>
        )
    }
    else if(props.maxpage <6) { 
        // let pageremain = props.maxpage //만들어야할 남은 페이지 수 최대 5개 
        let numberarray = new Array(props.maxpage).fill(props.nowpage) //해당 숫자길이의 array를 만들어서
        
        const arraytobtn = numberarray.map((el, idx)=>{
           
                return (
                    <div key = {idx}>
                        {idx + 1 === props.nowpage ? <NowPageBtn onClick = {btnclickhandler} >{idx+1}</NowPageBtn> : <PageBtn onClick = {btnclickhandler} >{idx+1}</PageBtn>}
                        
                    </div>
                    )
                })
        return (
            <NavBarContainer>
                {arraytobtn}
                
            </NavBarContainer>
            
            
        )

    }
    else {

        if(props.nowpage<4){
            return (<NavBarContainer>
                    {props.nowpage-2>0 ? <PageBtn onClick = {btnclickhandler} >{props.nowpage-2}</PageBtn>: null}
                    {props.nowpage-1>0 ? <PageBtn onClick = {btnclickhandler} >{props.nowpage-1}</PageBtn>: null}
                    <NowPageBtn onClick = {btnclickhandler} >{props.nowpage}</NowPageBtn>
                    <PageBtn onClick = {btnclickhandler} >{props.nowpage+1}</PageBtn>
                    <PageBtn onClick = {btnclickhandler} >{props.nowpage+2}</PageBtn>
                    <SkipSec>...</SkipSec>
                    <PageBtn onClick = {btnclickhandler} >{props.maxpage}</PageBtn>
                    
                
                
            </NavBarContainer>)
        }

        else if (props.nowpage > props.maxpage-3){
            return (
                <NavBarContainer>
                    
                        <PageBtn onClick = {btnclickhandler} >1</PageBtn>
                        <SkipSec>...</SkipSec>
                        
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage-2}</PageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage-1}</PageBtn>
                        <NowPageBtn onClick = {btnclickhandler} >{props.nowpage}</NowPageBtn>
                        {props.nowpage+1<=props.maxpage ? <PageBtn onClick = {btnclickhandler} >{props.nowpage+1}</PageBtn>: null}
                        {props.nowpage+2<=props.maxpage ? <PageBtn onClick = {btnclickhandler} >{props.nowpage+2}</PageBtn>: null}

                        
                        
                        
                        {/* <PageBtn onClick = {btnclickhandler} >{props.maxpage-2}</PageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.maxpage-1}</PageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.maxpage}</PageBtn>
                         */}
                    
                    
                </NavBarContainer>
            )

        }
        else {
            return (
                <NavBarContainer>
                
                        <PageBtn onClick = {btnclickhandler} >1</PageBtn>
                        <SkipSec>...</SkipSec>
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage-2}</PageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage-1}</PageBtn>
                        <NowPageBtn onClick = {btnclickhandler} >{props.nowpage}</NowPageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage+1}</PageBtn>
                        <PageBtn onClick = {btnclickhandler} >{props.nowpage+2}</PageBtn>
                        <SkipSec>...</SkipSec>
                        <PageBtn onClick = {btnclickhandler} >{props.maxpage}</PageBtn>
                        
                    
                    
                </NavBarContainer>
            )
        } 
    
    }
    
    
}

export default PageNav;