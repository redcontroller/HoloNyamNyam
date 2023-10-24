import styled from 'styled-components';

const SignUpContainerStyle = styled.div`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainerStyle = styled.form`
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  gap: 12px;
`;

const TitleStyle = styled.h1`
  color: #000;

  font-family: Spoqa Han Sans Neo;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const LabelStyle = styled.label`
  color: var(--767676, #767676);
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InputStyle = styled.input`
  width: 322px;
  height: 30px;
  border-bottom: 1px solid grey;

  &::placeholder {
    color: var(--DBDBDB, #dbdbdb);
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #ff644b;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ErrorStyle = styled.p`
  color: var(--Red, #eb5757);
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 116.667% */
`;

export {
  SignUpContainerStyle,
  TitleStyle,
  FormContainerStyle,
  LabelStyle,
  InputStyle,
  ErrorStyle,
};
