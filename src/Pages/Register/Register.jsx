import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signup } from "../../Redux/modules/userSlice";
import RegisterValidation from "../Register/registerValidation";
import useOutSideClick from "../../Shared/hooks/useOutSideClick";

function CreateCrew({ onClose, setLoginVisible }) {
  const dispatch = useDispatch();

  //useForm 관련
  const { schema } = RegisterValidation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const onSubmit = (data) => {
    // console.log(data);
    const payload = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      content: data.content,
    };
    dispatch(signup(payload));
    window.alert("회원가입 성공");
    onClose();
    setLoginVisible(true);
  };

  const onEnterSubmit = () => {
    const data = getValues();
    console.log(data);
    const payload = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      content: data.content,
    };
    dispatch(signup(payload));
    window.alert("회원가입 성공");
    onClose();
    setLoginVisible(true);
  };

  //모달 스크롤 방지
  useEffect(() => {
    const $body = document.querySelector("body");
    $body.style.overflow = "hidden";
    return () => ($body.style.overflow = "auto");
  }, []);

  //모달 바깎 클릭시 close
  // const modalRef = useRef(null);
  // useOutSideClick(modalRef, onClose);

  //form 내용 변경용
  const [isFirstForm, setIsFirstForm] = useState(true);
  const [isSecondForm, setIsSecondForm] = useState(false);
  const [isThirdForm, setIsThirdForm] = useState(false);

  //약관동의 checkbox 설정용
  const [isAllchecked, setIsAllchecked] = useState(false);
  const [isAgeCheck, setIsAgeCheck] = useState(false);
  const [isUseCheck, setIsUseCheck] = useState(false);
  const [isPrivacyCheck, setIsPrivacyCheck] = useState(false);

  const allCheckHandler = () => {
    if (isAllchecked === false) {
      setIsAgeCheck(true);
      setIsUseCheck(true);
      setIsPrivacyCheck(true);
    } else {
      setIsAllchecked(false);
      setIsAgeCheck(false);
      setIsUseCheck(false);
      setIsPrivacyCheck(false);
    }
  };

  const ageCheckHandler = () => {
    if (isAgeCheck === false) {
      setIsAgeCheck(true);
    } else {
      setIsAgeCheck(false);
    }
  };

  const useCheckHandler = () => {
    if (isUseCheck === false) {
      setIsUseCheck(true);
    } else {
      setIsUseCheck(false);
    }
  };

  const privacyCheckHandler = () => {
    if (isPrivacyCheck === false) {
      setIsPrivacyCheck(true);
    } else {
      setIsPrivacyCheck(false);
    }
  };

  useEffect(() => {
    if (isAgeCheck === true && isUseCheck === true && isPrivacyCheck === true) {
      setIsAllchecked(true);
      setIsFirstForm(false);
      setIsSecondForm(true);
    } else {
      setIsAllchecked(false);
    }
  }, [isAgeCheck, isUseCheck, isPrivacyCheck]);

  return (
    <Background>
      {isFirstForm && (
        <Modal1>
          <Xbtn onClick={onClose}></Xbtn>
          <Title>회원가입</Title>
          <Message>
            <h3>환영합니다!</h3>
            <p>
              클라이밍 크루 가입부터 내 주변 클라이밍 짐 찾기까지, <br />
              크럭스에서 함께해요!
            </p>
          </Message>
          <Line />
          <CheckBox>
            <div>
              <input
                type="checkbox"
                checked={isAllchecked}
                onChange={allCheckHandler}
              />
              <label>모두 동의합니다</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={isAgeCheck}
                onChange={ageCheckHandler}
              />
              <label>[필수] 만 14세 이상입니다</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="true"
                checked={isUseCheck}
                onChange={useCheckHandler}
              />
              <label>[필수] 크럭스 서비스 이용약관 동의</label>
              <a href="/terms/terms-of-use" target="_blank">
                보기
              </a>
            </div>
            <div>
              <input
                type="checkbox"
                value="true"
                checked={isPrivacyCheck}
                onChange={privacyCheckHandler}
              />
              <label>[필수] 개인정보 수집 및 이용 동의</label>
              <a href="/terms/user-privacy" target="_blank">
                보기
              </a>
            </div>
          </CheckBox>
        </Modal1>
      )}
      {isSecondForm && (
        <Modal>
          <Xbtn onClick={onClose}></Xbtn>
          <Title>회원가입</Title>
          <InputBox>
            <div>
              <input placeholder="이메일" {...register("email")} />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <input
                placeholder="닉네임(특수문자 제외 2~10자)"
                {...register("nickname")}
              />
              <p>{errors.nickname?.message}</p>
            </div>
            <div>
              <input
                placeholder="비밀번호(영문 대소문자, 숫자, 특수문자 포함)"
                type="password"
                {...register("password")}
              />
              <p>{errors.password?.message}</p>
            </div>
            <div>
              <input
                placeholder="비밀번호 확인"
                type="password"
                {...register("passwordConfirm")}
              />
              <p>{errors.passwordConfirm?.message}</p>
            </div>
          </InputBox>
          <SummitButton>
            <button
              type="button"
              onClick={() => {
                setIsSecondForm(false);
                setIsThirdForm(true);
              }}
            >
              다음
            </button>
          </SummitButton>
        </Modal>
      )}
      {isThirdForm && (
        <Modal onSubmit={handleSubmit(onSubmit)}>
          <Xbtn onClick={onClose}></Xbtn>
          <Title>회원가입</Title>
          <InputBox>
            <textarea
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEnterSubmit();
                }
              }}
              placeholder="자기소개(150자 이내)"
              {...register("content")}
            />
          </InputBox>
          <SummitButton>
            <button type="submit">완료</button>
          </SummitButton>
        </Modal>
      )}
    </Background>
  );
}

export default CreateCrew;

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

const Modal1 = styled.form`
  width: 500px;
  height: 520px;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 50px 0px 50px;
  position: relative;
`;

const Modal = styled.form`
  width: 500px;
  height: fit-content;
  background-color: #141414;
  display: flex;
  flex-warp: warp;
  flex-direction: column;
  align-items: center;
  padding: 65px 50px 65px 50px;
  position: relative;
`;

const Title = styled.p`
  width: 155px;
  height: 55px;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  letter-spacing: -0.05em;
  color: #ffffff;
`;

const Message = styled.div`
  width: 400px;
  height: 81px;
  white-space: pre-line;
  margin-top: 50px;
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: #ffffff;
    margin-top: 5px;
  }
`;

const Line = styled.div`
  width: 400px;
  height: 1px;
  border: none;
  border-bottom: 1px solid #202020;
  margin-top: 19px;
`;

const CheckBox = styled.div`
  div {
    width: 400px;
    height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 23px;
    &:nth-child(1) {
      margin-top: 31px;
      margin-bottom: 33px;
      label {
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
      }
    }
    input {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      accent-color: #ffb800;
    }
    label {
      color: #aaaaaa;
      font-size: 14px;
      font-weight: 250;
    }
    a {
      color: #aaaaaa;
      font-size: 14px;
      font-weight: 250;
      margin-left: 5px;
    }
  }
`;

const SummitButton = styled.div`
  button {
    width: 400px;
    height: 60px;
    border: none;
    margin-top: 20px;
    margint-bottom: 65px;
    background-color: #666666;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: -0.05em;
  }
`;

const SummitButton2 = styled.div`
  width: 400px;
  height: 60px;
  dislay: flex;
  flex-direction: row;
  margin-top: 30px;
  button {
    width: 190px;
    height: 60px;
    border: none;
    background-color: #666666;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: -0.05em;
    &:first-child {
      margin-right: 20px;
    }
  }
`;

const InputBox = styled.div`
  div {
    &:nth-child(1) {
      margin-top: 60px;
    }
    &:nth-child(2) {
      p {
        margin-bottom: 15px;
      }
    }
    input {
      width: 400px;
      height: 60px;
      outline: none;
      border: none;
      background-color: #262626;
      font-family: "Spoqa Han Sans Neo";
      font-style: normal;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      letter-spacing: -0.05em;
      padding: 20px 21px 21px 20px;
    }
    p {
      font-family: "Spoqa Han Sans Neo";
      font-style: normal;
      font-size: 11px;
      font-weight: 400;
      color: #cb2e2e;
      letter-spacing: -0.05em;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  textarea {
    width: 400px;
    height: 280px;
    margin-top: 60px;
    margin-bottom: 2px;
    padding: 20px;
    resize: none;
    border: none;
    :focus {
      outline: none;
    }
    background-color: #262626;
    background-color: #262626;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: -0.05em;
  }
`;

const TextBox = styled.div`
  width: 400px;
  height: 280px;
  margin-top: 60px;
  textarea {
    width: 400px;
    height: 280px;
    background-color: #262626;
    resize: none;
    outline: none;
    border: none;
  }
`;

const Xbtn = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
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
