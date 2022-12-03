import { 
    request, 
    // API 
} from "./core";


// GET 요청
const GetAxios = (URL) => { 
    return request({url: `${URL}`})
}

// POST 요청
const PostAxios = (URL, Object) => {
    return request({
        method: 'post',
        url: `${URL}`,
        data: Object // parameter 매개변수 추가해서 data에 받아보자
    });
}

// DELETE 요청
const DeleteAxios = (URL) => {
    return request({
        method: 'delete',
        url: `${URL}`,
    });
}

// PUT 요청
const PutAxios = (URL, Object) => {
    return request({
        method: 'put',
        url: `${URL}`,
        data: Object
    })
}

export {
    GetAxios,
    PostAxios,
    DeleteAxios,
    PutAxios
}