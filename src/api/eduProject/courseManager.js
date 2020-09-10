// 进行远程调用
import axios from 'axios'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

// 课程列表
export const getCourseList = params => {
  return axios
    .post('/api-edu/course/courseList', JSON.stringify(params))
    .then(res => res.data)
}
