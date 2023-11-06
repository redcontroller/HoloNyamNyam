import React from 'react';
import SignUpForm from '../../components/Signup/SignUpForm';
import { SimpleLoginWrap, SnsButton, SnsList } from '../Login/StyledLogin';
import sprite from '../../images/SpriteIcon.svg';

export default function Signup() {
  const SnsSVG = ({ id, size = 24 }) => (
    <svg width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
  return (
    <>
      <SignUpForm />
      <SimpleLoginWrap data-content='간편 회원가입'>
        <h2 className='a11y-hidden'>소셜서비스로 회원가입</h2>
        <SnsList>
          <li>
            <SnsButton $color='kakao'>
              <SnsSVG id='kakao' />
              <h3 className='a11y-hidden'>카카오 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton $color='google'>
              <SnsSVG id='google' />
              <h3 className='a11y-hidden'>구글 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton $color='github'>
              <SnsSVG id='github' />
              <h3 className='a11y-hidden'>깃허브 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton $color='facebook'>
              <SnsSVG id='facebook' />
              <h3 className='a11y-hidden'>페이스북 계정으로 회원가입</h3>
            </SnsButton>
          </li>
        </SnsList>
      </SimpleLoginWrap>
    </>
  );
}
