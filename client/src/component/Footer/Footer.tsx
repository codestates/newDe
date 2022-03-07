import {
  FooterContainer,
  FooterWrap,
  TeamInfoBox,
  SiteInfoBox,
} from './styled';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <TeamInfoBox>
          <li>
            <h3>&middot; Newbie Developer</h3>
            <span>Creative. Attractive.</span>
            <span>Born in Seoul 22.</span>
          </li>
          <li>
            <h3>&middot; Team</h3>
            <a href="https://github.com/shjthd92">HakJong Song</a>
            <a href="https://github.com/Kingsenal">JunHyuk Kwon</a>
            <a href="https://github.com/seunghyeonL">SeungHyeon Lee</a>
            <a href="https://github.com/choipingu">HyeongJin Choi</a>
          </li>
        </TeamInfoBox>
        <SiteInfoBox>
          <h1>NEWDE</h1>
          <div>Newbie Developer @ 2022</div>
        </SiteInfoBox>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
