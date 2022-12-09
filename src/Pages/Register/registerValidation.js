import * as yup from "yup";
import { useMemo } from "react";
import axios from "axios";
import { GetAxios } from "../../Shared/api/main";

const RegisterValidation = () => {
  const schema = useMemo(() => {
    return yup
      .object()
      .shape({
        email: yup
          .string()
          .email("이메일을 정확히 입력해주세요.")
          .required("이메일을 입력해주세요.")
          .test(
            "verifyEmail",
            "중복된 이메일입니다.",
            async function verifyEmail(value) {
              try {
                const response = await GetAxios(`members/email-check?email=${value}`)
                // console.log(response.data);
                return response.data.success;
              } catch (error) {
                return false;
              }
            }
          ),
        nickname: yup
          .string()
          .required("닉네임을 입력해주세요.")
          .min(2, "2자 이상 입력해주세요.")
          .matches(
            /^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$/,
            "닉네임은 한글, 영어, 숫자만 입력할 수 있습니다."
          )
          .test(
            "verifyNickname",
            "중복된 닉네임입니다",
            async function verifyNickname(value) {
              try {
                const response = await GetAxios(`members/nickname-check?nickname=${value}`)
                
                // console.log(response);
                return response.data.success;
              } catch (error) {
                return false;
              }
            }
          ),
        password: yup
          .string()
          .required("비밀번호를 입력해주세요.")
          .min(4, "4자 이상 입력해주세요.")
          .matches(
            /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{4,12}/,
            "비밀번호는 4~12자이며,영문,숫자,특수문자를 하나씩 포함해야 합니다."
          ),
        passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
          .required("비밀번호 확인을 입력해주세요."),
        content: yup
          .string()
          .required("자기소개를 입력해주세요.")
          .max(150, "자기소개는 150자를 초과해서 입력할 수 없습니다."),
      })
      .required();
  }, []);
  return { schema };
};

export default RegisterValidation;
