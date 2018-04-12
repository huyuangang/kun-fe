
import axios from 'axios'

const API_HOST = 'http://192.168.2.206:8000'


//登陆
const LOGIN_PATH = '/login'

export function login({
    params={},
    success,
    fail
}) {
    axios
        .post(_handlePath(LOGIN_PATH), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })

}

//注册
const REGIST_PATH = '/create_admin'

export function regist({
    params={},
    success,
    fail
}) {
    axios
        .post(_handlePath(REGIST_PATH), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })

}


function _handlePath(p) {
    return API_HOST + p;
}