// 进行远程调用
import axios from 'axios'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'

// 课程分类树形结构
export const getSubjectTree = params => {
  return axios
    .post('/api-edu/subject/subjectList', JSON.stringify(params))
    .then(res => res.data)
}

// 一级课程分类
export const getOneSubjectList = params => {
  return axios
    .post('/api-edu/subject/oneSubjectList', JSON.stringify(params))
    .then(res => res.data)
}

// 二级课程分类
export const getTwoSubjectList = params => {
  return axios
    .post('/api-edu/subject/twoSubjectList', JSON.stringify(params))
    .then(res => res.data)
}

// 保存分类课程信息
export const saveSubject = params => {
  return axios
    .post('/api-edu/subject/saveSubject', JSON.stringify(params))
    .then(res => res.data)
}

// 删除分类信息
export const deleSubject = params => {
  return axios
    .post('/api-edu/subject/deleSubject', JSON.stringify(params))
    .then(res => res.data)
}
