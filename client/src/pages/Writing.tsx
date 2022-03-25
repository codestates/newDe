import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { apiURL } from '../url'
import { RootState } from '../store'
import { useAppSelector } from '../store/hooks'
import { useNavigate } from 'react-router-dom';
import './Writing.css'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ContainerWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 70vh;
margin-top: 7%;
@media ${(props) => props.theme.mobile}{
    width: 100%;
}
`
const Title = styled.h1`
 text-align: start;
 width: 855px;
 font-size: x-large;
 margin-bottom: 5px;
`

const WritingWrap = styled.div`
border: 1px solid black;
height: 100%;
padding: 10px;
margin-bottom: 3%;
`

const ButtonWrap = styled.div`
display: flex;
justify-content: right;
> button {
    margin-top: 10px;
    border: none;
    background-color: white;
    font-size: 20px;
    &:hover,:focus {
      cursor: pointer;
      outline: none;
      transform: scale(1.05);
    }
}
`

function Writing(): JSX.Element {
    // 글쓰기 할때 useEffect 였는데 글 수정시 useEffect랑 통합하기
    // useEffect(()=>{
    //     setContents({ ...contents, parentCategory: parent ,childCategory:child})
    // },[])

    useEffect(() => {
        // 뭔가 안에서 async를 해도 프라미스 내용물이 안나온다. 바깥함수가 async가 아니라서 그런가?
        // then으로 바꿔서 만들어 보자
        setContents({ ...contents, parentCategory: parent ,childCategory:child})
        setSelParent(parent);
        setSelChild(child);
        async function fetchData() {
            try {
                const res = await axios.get(`${apiURL}/board/${contentId}`, config)

                // console.log('~~~!!!~~~', res.data)
                setContents({
                    title: res.data.data.title,
                    main: res.data.data.main,
                    parentCategory: res.data.data.parentCategory,
                    childCategory: res.data.data.childCategory
                })
            } catch (e) {
                console.log(e)
            }
        }
        // console.log(typeof (contentId));
        if (Number(contentId)) fetchData();

        // axios.get(`${apiURL}/board/${contentId}`, config)
        //     .then((res) => {
        //         console.log(res.data.main);
        //         setGetContentMain(res.data.main);
        //     })        
    }, [])

    const url = window.location.href;
    const contentId = url.split('/')[url.split('/').length - 1];
    // console.log(contentId)

    const [editContents, setEditContents] = useState({
        title: '',
        main: '',
        parentCategory: '',
        childCategory: ''
    });

    const navigate = useNavigate()

    const QuillRef = useRef<ReactQuill>()
    const [selParent, setSelParent] = useState('')
    const [selChild, setSelChild] = useState('')
    const [contents, setContents] = useState({
        title: '',
        main: '',
        parentCategory: '',
        childCategory: ''
    });// 에디터 속 콘텐츠를 저장하는 state

    const { parent, child } = useAppSelector((state: RootState) => state.info)
    const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true
    }

    const clickhandler = async (e: any) => {
        try {
            let createdContentRes;            
            if (Number(contentId)) createdContentRes = await axios.patch(`${apiURL}/board/${contentId}`, contents, config)
            else createdContentRes = await axios.post(`${apiURL}/board`, contents, config)

            // console.log(createdContentRes.data)
            navigate(`/${createdContentRes.data.data.id}`)
        } catch (err) {
            console.log(err)
        }

        // console.log(contents)
    }
    // 이미지를 업로드 하기 위한 함수
    const imageHandler = () => {
        // 파일을 업로드 하기 위한 input 태그 생성
        const input = document.createElement("input");
        const formData = new FormData();
        let url = "";

        input.setAttribute("type", "file");//type="file"
        input.setAttribute("accept", "image/*");//accept="image/*"
        input.click();//에디터 이미지버튼을 클릭하면 이 input이 클릭됨
        // input이 클릭되면 파일 선택창이 나타난다
        // 파일이 input 태그에 담기면 실행 될 함수 
        input.onchange = async () => {
            const file = input.files;
            if (file !== null) {
                formData.append("img", file[0]);// formData는 키-밸류 구조

                try {
                    const res = await axios.post(`${apiURL}/image`, formData)

                    url = res.data.url;
                    // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
                    // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
                    // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.


                    // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
                    // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
                    const range = QuillRef.current?.getEditor().getSelection()?.index;
                    if (range !== null && range !== undefined) {
                        let quill = QuillRef.current?.getEditor();

                        quill?.setSelection(range, 1);

                        quill?.clipboard.dangerouslyPasteHTML(
                            range,
                            `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
                        );
                    }

                    return { ...res, success: true };
                } catch (error) {
                    console.log(error)
                }
            }
        };
    };
    // quill에서 사용할 모듈을 설정하는 코드 입니다.
    // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
    // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.

    // Quill 에디터에서 사용하고싶은 모듈들을 설정한다.
    // useMemo를 사용해 modules를 만들지 않는다면 매 렌더링 마다 modules가 다시 생성된다.
    // 그렇게 되면 addrange() the given range isn't in document 에러가 발생한다.
    // -> 에디터 내에 글이 쓰여지는 위치를 찾지 못하는듯
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ 'font': [] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' },],
                    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
                // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        []
    );

    // 위에서 설정한 모듈들 foramts을 설정한다
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'video',
        'align',
        'color',
        'background',
        'clean',
    ];

    // console.log(contents)
    const onChange = (e: any) => {
        if (e.target.placeholder === 'title') {
            setContents({ ...contents, title: e.target.value })
        }
    }
    // 이미지를 저장할 input 요소를 만든다
    // 에디터에서 이미지 버튼을 클릭 시, 만든 input 요소가 클릭되게 한다
    // 클릭된 input 요소에 이미지를 넣는다 = change 이벤트 발생
    // change 이벤트가 발생할 때마다, 이미지를 백엔드에 저장한다.
    // 백엔드에서 이미지 접근 URL을 돌려 받는다.
    // 받은 URL로 img 요소를 생성한다 <img src=IMG_URL>
    // 생성한 img 요소를 현재 에디터 커서 위치에 삽입한다.
    const parentDrop = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelParent(event.target.value);
        setContents({...contents, parentCategory:event.target.value})
    }
    const childDrop = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelChild(event.target.value);
        setContents({...contents, childCategory:event.target.value})
    }

    // console.log(contents);
    
    return (


        <ContainerWrap>
            <Title>Writing</Title>
            <WritingWrap>
                <select value={selParent} onChange={parentDrop}>
                    <option disabled hidden value=''>대분류</option>
                    <option value='Front'>Front</option>
                    <option value='Back'>Back</option>
                </select>
                {selParent ==='front'
                ?
                <select value={selChild} onChange={childDrop}>
                    <option disabled hidden value=''>소분류</option>
                    <option value='HTML'>HTML</option>
                    <option value='css'>CSS</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='react'>React</option>
                    <option value='프론트기타'>프론트기타</option>
                </select>
                :
                <select value={selChild} onChange={childDrop}>
                    <option disabled hidden value=''>소분류</option>
                    <option value='php'>php</option>
                    <option value='node.js'>Node.js</option>
                    <option value='java'>Java</option>
                    <option value='python'>Python</option>
                    <option value='server'>server</option>
                    <option value='백엔드기타'>백엔드기타</option>
                </select>
                }
                
                <input
                    placeholder="title"
                    style={{ height: "35px", width: '100%', padding: '15px', margin: '10px 0px 10px 0px' }}
                    onChange={onChange}
                    value={contents.title}>
                </input>
                <ReactQuill
                    ref={(element) => {
                        if (element !== null) {
                            QuillRef.current = element;
                        }
                    }}

                    value={contents.main}
                    // onChange={(main) => { setContents((prev) => { return { ...prev, main: main } }) }}
                    onChange={(main) => { setContents({ ...contents , main: main }) }}

                    theme="snow"
                    placeholder="main"
                    modules={modules}
                    formats={formats}
                />
                <ButtonWrap>
                   <button onClick={clickhandler}><FontAwesomeIcon icon={faPen} /></button>
                </ButtonWrap>
            </WritingWrap>
        </ContainerWrap>

    );
}


export default Writing