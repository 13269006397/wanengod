// 进行远程调用
import axios from 'axios'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

// 声明一个调用方法
export const requestLogin = params => {
  return axios
    .post('/api-user/user/login/userLogin', JSON.stringify(params))
    .then(res => res.data)
}

// 发送登录短信验证码
export const setVfCode = params => {
  return axios
    .post('/api-user/user/login/findSetVFCode', JSON.stringify(params))
    .then(res => res.data)
}

// 新增用户 用户注册
export const addUser = params => {
  return axios
    .post('/api-user/user/login/addUser', JSON.stringify(params))
    .then(res => res.data)
}

// 根据id查用户
export const findUserById = params => {
  return axios
    .post('/api-user/user/findUserById', JSON.stringify(params))
    .then(res => res.data)
}
