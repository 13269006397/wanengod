<template>
    <div class="header_userManager">
      <!--面包屑导航区-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!--卡片视图区-->
      <el-card>
        <!--栅格系统写头部区-->
        <el-row :gutter="10">
          <!--搜索与添加-->
          <el-col :span="3">
            <el-input v-model="requestParams.mobile" clearable placeholder="手机号"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="requestParams.nickName" clearable placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="requestParams.isDelete" clearable placeholder="用户状态">
              <el-option
                v-for="item in userStatus"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-search" @click="getUserList" plain>搜索</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" icon="el-icon-refresh-left" @click="restRequestParams" plain>重置</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addUserVisible = true" plain>添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-bottom"  plain>导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" icon="el-icon-top" plain @click="downloadExcel">导出</el-button>
          </el-col>
        </el-row>

        <!--内容区-->
        <el-table
          v-loading="ListLoading"
          :data="list"
          max-height="450"
          ref="addUserRef"
          border
          stripe>
          <el-table-column
            fixed
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            fixed
            prop="nickName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idNumber"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            label="性别"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.sex | sexFilter }}
            </template>
          </el-table-column>
          <el-table-column
            label="出生日期"
            width="140">
            <template slot-scope="scope">
              {{ scope.row.birthday | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="220">
          </el-table-column>
          <el-table-column
            prop="interest"
            label="兴趣"
            width="140">
          </el-table-column>
          <el-table-column
            prop="personality"
            label="个性"
            width="140">
          </el-table-column>
          <el-table-column
            prop="fansCount"
            label="粉丝数"
            width="140">
          </el-table-column>
          <el-table-column
            prop="followCount"
            label="关注数"
            width="140">
          </el-table-column>
          <el-table-column
            label="注册日期"
            width="190">
            <template slot-scope="scope">
              {{ scope.row.regTime | formatAllDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="最后登录日期"
            width="190">
            <template slot-scope="scope">
              {{ scope.row.lastTime | formatAllDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="角色"
            width="150">
            <template slot-scope="scope">
              {{ scope.row.permission | permissionFilter }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isDelete"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="01"
                inactive-value="02"
                @change="userStatusChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateUserView(scope.row.id)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
              <el-tooltip content="分配角色" placement="top" :enterable="false" :open-delay="100">
                <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="requestParams.page"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="requestParams.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total">
        </el-pagination>

        <!--新增用户页面-->
        <el-dialog
          title="添加用户"
          style="text-align: center"
          :visible.sync="addUserVisible"
          width="55%">
          <el-form :model="userModel" status-icon :rules="rules" ref="userModel" label-width="100px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="userModel.mobile" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名">
                  <el-input v-model="userModel.nickName" maxlength="10" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="userModel.password" autocomplete="off" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="userModel.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="userModel.age" maxlength="2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="身份证号" prop="idNumber">
                  <el-input v-model="userModel.idNumber" type="text" maxlength="18" show-word-limit autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="性别">
                  <el-select v-model="userModel.sex" clearable style="width: 100%;">
                    <el-option
                      v-for="item in gender"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="生日">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="userModel.birthday"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userModel.email" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="个性">
                  <el-input v-model="userModel.personality" maxlength="20" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="兴趣爱好">
                  <el-input v-model="userModel.interest" type="textarea" maxlength="80" :autosize="{ minRows: 2, maxRows: 3}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="附件">
                  <el-upload
                    ref="uploadAdd"
                    class="upload-demo"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                    :http-request="uploadFileAdd"
                    :limit="3"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                  >
                    <el-button size="small" type="primary">选择文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="userCancel">取 消</el-button>
            <el-button type="primary" @click="saveUser">确 定</el-button>
          </span>
        </el-dialog>

        <!--修改用户对话框-->
        <el-dialog
          title="修改用户"
          style="text-align: center"
          :visible.sync="updateUserVisible"
          width="55%">
          <el-form :model="updateUserModel" status-icon :rules="rules" ref="updateUserModel" label-width="100px">
            <el-row>
              <el-col :span="11">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="updateUserModel.mobile" maxlength="11" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名">
                  <el-input v-model="updateUserModel.nickName" maxlength="10" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="updateUserModel.password" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="updateUserModel.age" maxlength="2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="身份证号" prop="idNumber">
                  <el-input v-model="updateUserModel.idNumber" type="text" maxlength="18" show-word-limit autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="性别">
                  <el-select v-model="updateUserModel.sex" clearable style="width: 100%;">
                    <el-option
                      v-for="item in gender"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="11">
                <el-form-item label="生日">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="updateUserModel.birthday"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="updateUserModel.email" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="个性">
                  <el-input v-model="updateUserModel.personality" maxlength="20" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="兴趣爱好">
                  <el-input v-model="updateUserModel.interest" type="textarea" maxlength="80" :autosize="{ minRows: 2, maxRows: 3}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateUserCancel">取 消</el-button>
            <el-button type="primary" @click="updateUser">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
</template>

<script>
import { findUserList, updateUserStatus, findUserById, deletUserById } from '../api/api'
import axios from 'axios'
import { formatDate } from '../utils/date'
export default {
  name: 'UserManager',
  filters: {
    sexFilter (value) {
      if (value) {
        if (value === '01') {
          value = '男'
        }
        if (value === '02') {
          value = '女'
        }
        if (value === '99') {
          value = '未知性别'
        }
      }
      return value
    },
    permissionFilter (value) {
      if (value) {
        if (value === '01') {
          value = '管理员'
        }
        if (value === '02') {
          value = '普通用户'
        }
        if (value === '03') {
          value = '氪金用户'
        }
      }
      return value
    },
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateBehind (time) {
      const date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    },
    formatAllDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  data () {
    const email = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      setTimeout(() => {
        if (value === '' || value === undefined || value === null) {
          callback(new Error('邮箱不能为空'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
          } else {
            callback()
          }
        }
      }, 1000)
    }

    const idNumber = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      setTimeout(() => {
        if (value === '' || value === undefined || value == null) {
          callback(new Error('身份证不能为空'))
        } else {
          if ((!reg.test(value)) && value !== '') {
            callback(new Error('请输入正确的身份证号码'))
          } else {
            callback()
          }
        }
      }, 1000)
    }

    const checkMobile = (rule, value, callback) => {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
      setTimeout(() => {
        if (value === '' || value === undefined || value == null) {
          callback(new Error('手机号不能为空'))
        } else {
          if ((!reg.test(value)) && value !== '') {
            callback(new Error('请输入正确的手机号码'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    //  数据校验附加规则
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error('请输入正整数'))
        } else {
          const re = /^[0-9]*[1-9][0-9]*$/
          const rsCheck = re.test(value)
          if (!rsCheck) {
            callback(new Error('请输入正整数'))
          } else {
            callback()
          }
        }
      }, 0)
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('密码不能少于6位！'))
      } else if (value.length > 16) {
        return callback(new Error('密码最长不能超过16位！'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.userModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }, 1000)
    }

    return {
      delFiles: [],
      fileCode: '',
      oriFileName: '',
      reportFileList: [],
      fileList: [],
      fileName: undefined,
      files: undefined,
      updateUserVisible: false,
      addUserVisible: false,
      ListLoading: false,
      list: [],
      total: undefined,
      delList: [],
      requestParams: {
        mobile: '',
        nickName: '',
        permission: '',
        page: 0,
        limit: 10,
        isDelete: ''
      },
      userModel: {
        id: '',
        password: '',
        checkPass: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: '',
        age: '',
        sex: '',
        birthday: undefined,
        email: '',
        interest: '',
        idNumber: ''
      },
      updateUserModel: {
        id: '',
        password: '',
        checkPass: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: '',
        age: '',
        sex: '',
        birthday: undefined,
        email: '',
        interest: '',
        idNumber: ''
      },
      userInfo: {
        id: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: ''
      },
      updateUserInfo: {
        id: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: '',
        fileId: ''
      },
      userStatus: [{
        value: '01',
        label: '正常'
      }, {
        value: '02',
        label: '冻结'
      }],
      gender: [{
        value: '01',
        label: '男'
      }, {
        value: '02',
        label: '女'
      }, {
        value: '99',
        label: '未知'
      }],
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        idNumber: [
          { validator: idNumber, trigger: 'blur' }
        ],
        email: [
          { validator: email, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 删除附件
    deleteFile (item, index) {

    },
    // 下载附件
    downLoad () {

    },
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadFileAdd (item) {
      this.fileList.push(item.file)
    },
    // 删除用户
    deleteUser (id) {
      this.userInfo.id = id
      this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletUserById(this.userInfo).then(response => {
          if (response.code === 200) {
            this.getUserList()
            this.$message({
              type: 'success',
              message: response.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改角色信息
    updateUser () {
      this.$refs.updateUserModel.validate(valid => {
        if (valid) {
          updateUserStatus(this.updateUserModel).then(response => {
            if (response.code === 200) {
              this.updateUserCancel()
              this.getUserList()
              this.$message({
                message: response.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.msg,
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 打开修改用户页面
    updateUserView (id) {
      this.updateUserInfo.id = id
      // 根据id查询当前人员信息
      findUserById(this.updateUserInfo).then(response => {
        if (response.code === 200) {
          this.reportFileList = response.data.reportFileList
          this.updateUserModel = response.data.user
        }
      })
      this.updateUserVisible = true
    },
    // 关闭修改用户页面
    updateUserCancel () {
      this.updateUserVisible = false
      this.$refs.updateUserModel.resetFields()
    },
    // 新增用户页面关闭
    userCancel () {
      this.addUserVisible = false
      this.$refs.userModel.resetFields()
      this.userModel = ''
    },
    saveUser () {
      // 新增用户
      this.$refs.userModel.validate(valid => {
        if (valid) {
          if (this.fileList.length > 0) {
            this.file.forEach(item => {
              const isLt8M = item.size / 1024 / 1024 < 2
              if (!isLt8M) {
                this.$message.error('文件不能超过8M')
              }
            })
          }
          this.$refs.uploadAdd.submit()
          this.beforeUploadAdd()
        }
      })
    },
    // 文件上传+ form表单数据
    beforeUploadAdd () {
      const requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          userToken: localStorage.getItem('token')
        }
      }
      const fd = new FormData()
      if (this.fileList.length > 0) {
        this.fileList.forEach(item => {
          fd.append('files', item)
        })
      }
      fd.append('mobile', this.userModel.mobile)
      fd.append('nickName', this.userModel.nickName)
      fd.append('password', this.userModel.password)
      fd.append('age', this.userModel.age)
      fd.append('idNumber', this.userModel.idNumber)
      fd.append('sex', this.userModel.sex)
      fd.append('birthday', this.userModel.birthday)
      fd.append('email', this.userModel.email)
      fd.append('personality', this.userModel.personality)
      fd.append('interest', this.userModel.interest)
      axios.post('/api-user/user/login/addUser', fd, requestConfig).then((response) => {
        if (response.data.code === 200) {
          this.addUserVisible = false
          this.getUserList()
          this.$message({
            type: 'success',
            message: response.data.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          })
        }
      })
    },
    // 重置搜索 页面数据
    restRequestParams () {
      this.requestParams.mobile = ''
      this.requestParams.nickName = ''
      this.requestParams.isDelete = ''
      this.list = undefined
    },
    // 监听 用户状态的改变
    userStatusChange (userInfo) {
      this.userInfo.id = userInfo.id
      this.userInfo.isDelete = userInfo.isDelete
      // 改变用户当前状态
      updateUserStatus(this.userInfo).then(response => {
        this.ListLoading = true
        if (response.code === 200) {
          this.ListLoading = false
          this.$message({
            message: response.msg,
            type: 'success'
          })
        } else {
          this.ListLoading = false
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      })
    },
    // 监听page size (limit)改变事件
    handleSizeChange (newSize) {
      this.requestParams.limit = newSize
      this.getUserList()
    },
    // 页码值 发生改变事件
    handleCurrentChange (newPage) {
      this.requestParams.page = newPage
      this.getUserList()
    },
    // 获取用户列表
    getUserList () {
      this.ListLoading = true
      findUserList(this.requestParams).then(data => {
        if (data.code === 200) {
          this.list = data.data.items
          this.total = data.data.total
          this.ListLoading = false
        } else {
          this.ListLoading = false
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    },
    // 用户导出
    downloadExcel () {
      axios.post('/api-user/excel/downLoadExcel', this.requestParams, { responseType: 'blob' }).then((_res) => {
        // 将返回文件新建成为工作流
        const blob = new Blob([_res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
        const a = document.createElement('a')
        // 生成文件路径
        const href = window.URL.createObjectURL(blob)
        a.href = href
        const _fileName = _res.headers['content-disposition'].split(';')[1].split('=')[1].split('.')[0]
        // 文件名中有中文 则对文件名进行转码
        a.download = decodeURIComponent(_fileName)
        // 利用a标签做下载
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(href)
      })
    }
  }
}

</script>

<style lang="less" scoped>

</style>
