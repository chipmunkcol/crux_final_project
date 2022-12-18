import axios from "axios";

const request = axios.create({ //axios 인스턴스 생성
    baseURL: 'https://sparta-jhw.shop/',
    headers: { Authorization: JSON.parse(window.localStorage.getItem("userInfo"))?.access_token }
})



// const API = (api) => `${baseURL}${api}`;




// // 요청 타임아웃 설정
// request.defaults.timeout = 2500;

// // 요청 인터셉터 추가
// request.interceptors.request.use(
//     config => { // 요청을 보내기 전에 수행할 로직
//         return config
//     },
//     error => { // 요청 에러가 발생했을 때 수행할 로직
//         console.log(error)
//         return Promise.reject(error)
//     }
// )

// // 응답 인터셉터 추가
// request.interceptors.response.use(
//     response => {
//         const res = response.data
//         return res
//     },
//     error => { // 응답 에러가 발생했을 떄 수행할 로직
//         console.log(error)
//         return Promise.reject(error);
//     }
// )

export {
    request, 
    // API
} ; // axios 인스턴스 받아라~!