// 进行远程调用
import axios from 'axios'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

// 讲师列表
export const teacherList = params => {
  return axios
    .post('/api-edu/eudService/eduTeacherList', JSON.stringify(params))
    .then(res => res.data)
}

// 修改讲师状态
export const updateTeacher = params => {
  return axios
    .post('/api-edu/eudService/updateEduTeacher', JSON.stringify(params))
    .then(res => res.data)
}

// 根据id查询讲师信息
export const findTeacherById = params => {
  return axios
    .post('/api-edu/eudService/findTeacherById', JSON.stringify(params))
    .then(res => res.data)
}
