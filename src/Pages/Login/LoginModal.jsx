import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../Redux/modules/userSlice";
import useOutSideClick from "../../Shared/hooks/useOutSideClick";
import { ReactComponent as ClearXbtn } from "../../Image/x.svg";

function LoginModal({ onClose }) {
  const dispatch = useDispatch();

  //useForm 관련
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  //form submit
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  //오류 발생시 보더 색상 변경
  const [emailBorder, setEmailBorder] = useState("none");
  const [passwordBorder, setPasswordBorder] = useState("none");

  //완료시 버튼 컬러 변경
  const [btnColor, setBtnColr] = useState("gray");

  //모달 스크롤 방지
  useEffect(() => {
    const $body = document.querySelector("body");
    $body.style.overflow = "hidden";
    return () => ($body.style.overflow = "auto");
  }, []);

  //모달 바깎 클릭시 close
  const modalRef = useRef(null);
  useOutSideClick(modalRef, onClose);

  //카카오 로그인
  const API = `6a2435f02f897dc1c87f7cca3eb2bfbb`;
  const URI = `https://youmadeit.shop/kakaologin`;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API}&redirect_uri=${URI}&response_type=code`;

  const handleKaKaoLogin = () => {
    window.location.replace(KAKAO_URL);
  };

  //input x버튼 관련
  const emailValue = watch("email");
  const PasswordValue = watch("password");

  return (
    <Background>
      <Modal onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <Xbtn onClick={onClose}></Xbtn>
        <InputBox emailBorder={emailBorder} passwordBorder={passwordBorder}>
          <div>
            <input
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                  message: "이메일을 정확히 입력해주세요.",
                },
              })}
            />
            {emailValue?.length > 0 ? (
              <div>
                <ClearXbtn
                  onClick={() => {
                    setValue("email", "");
                    resetField("email");
                  }}
                />
              </div>
            ) : null}
          </div>
          <div>
            <p>{errors?.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {PasswordValue?.length > 0 ? (
              <div>
                <ClearXbtn
                  onClick={() => {
                    setValue("password", "");
                    resetField("password");
                  }}
                />
              </div>
            ) : null}
          </div>
          <div>
            <p>{errors?.password?.message}</p>
          </div>
        </InputBox>
        <Buttonbox>
          <button type="submit">로그인</button>
          <button type="button" onClick={handleKaKaoLogin}>
            카카오톡 로그인
          </button>
        </Buttonbox>
      </Modal>
    </Background>
  );
}

export default LoginModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  z-index: 99999;
`;

const Modal = styled.form`
  width: 500px;
  height: fit-content;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 50px 65px 50px;
  position: relative;
`;

const Title = styled.p`
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  letter-spacing: -0.05em;
  color: #ffffff;
`;

const InputBox = styled.div`
  div {
    &:nth-child(1) {
      width: 400px;
      height: 60px;
      height: fit-content;
      margin-top: 50px;
      margin-bottom: 10px;
      position: relative;
      div {
        width: 19px;
        height: 19px;
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      input {
        width: 400px;
        height: 60px;
        outline: none;
        border: ${(props) => props.emailBorder || "none"};
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: -0.05em;
        margin: 0;
        padding: 21px 45px 21px 20px;
        color: #ffffff;
        background-color: #262626;
      }
    }
    &:nth-child(2) {
      p {
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        letter-spacing: -0.05em;
        color: #cb2e2e;
        margin-bottom: 10px;
      }
    }
    &:nth-child(3) {
      width: 400px;
      height: 60px;
      position: relative;
      div {
        width: 19px;
        height: 19px;
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      input {
        width: 400px;
        height: 60px;
        outline: none;
        border: ${(props) => props.passwordBorder || "none"};
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: -0.05em;
        margin: 0;
        padding: 21px 45px 21px 20px;
        color: #ffffff;
        background-color: #262626;
      }
    }
    &:nth-child(4) {
      p {
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        letter-spacing: -0.05em;
        color: #cb2e2e;
        margin-top: 10px;
      }
    }
  }
`;

const Buttonbox = styled.div`
  margin-top: 63px;
  button {
    width: 400px;
    height: 60px;
    border: none;
    background-color: #666666;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #141414;
    letter-spacing: -0.05em;
    &:first-child {
      &:hover {
        color: #141414;
        background-color: #ffb800;
        transition: 0.5s;
      }
      margin-bottom: 25px;
    }
    &:last-child {
      color: #141414;
      background-color: #fae100;
      margin-top: 26px;
    }
  }
`;

const Xbtn = styled.div`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  ::before,
  ::after {
    position: absolute;
    top: -2px;
    content: "";
    height: 25px;
    width: 1px;
    background-color: #ffffff;
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
