import { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";
import {AiOutlineCloseSquare} from 'react-icons/ai'

export type ModalBaseProps = {
    children?: ReactNode;
    visible: boolean;
    onClose: () => void;
  };
  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.3s ease-out;
  transition: visibility 0.3s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  @media ${(props)=> props.theme.mobile}{
    width: 100%;
    
}
  ${(props) => modalSettings(props.visible)}
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
`;

const Content = styled.div`
  padding: 16px 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
  const ModalBase = ({ children, visible, onClose }: ModalBaseProps) => {
    if (!visible) {
      return null;
    }
  
    return (
      <>
        <Background visible={visible} onClick={onClose} />
        <ModalSection visible={visible}>
          <Title>
            <CloseButton type="button" onClick={onClose}>
                <AiOutlineCloseSquare size={28}/>
            </CloseButton>
          </Title>
          <Content>{children}</Content>
        </ModalSection>
      </>
    );
  };
  
  export default ModalBase;