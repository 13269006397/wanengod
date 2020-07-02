<template>
    <div>
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
            <el-button type="danger" icon="el-icon-top" plain>导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" icon="el-icon-bottom" plain>导出</el-button>
          </el-col>
        </el-row>

        <!--内容区-->
        <el-table
          v-loading="ListLoading"
          :data="list"
          border
          stripe>
          <el-table-column
            type="index"
            label="序号">
          </el-table-column>
          <el-table-column
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
            prop="mobile"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            width="140">
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
            prop="regTime"
            label="注册日期"
            width="190">
          </el-table-column>
          <el-table-column
            prop="lastTime"
            label="最后登录日期"
            width="190">
          </el-table-column>
          <el-table-column
            prop="permission"
            label="角色"
            width="150">
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
            <template>
              <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
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
                  <el-input v-model="userModel.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名">
                  <el-input v-model="userModel.nickName" maxlength="10" autocomplete="off" show-password></el-input>
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
                <el-form-item label="兴趣爱好">
                  <el-input v-model="userModel.interest" type="textarea" maxlength="80" :autosize="{ minRows: 2, maxRows: 3}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveUser">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
</template>

<script>
import { findUserList, updateUserStatus, addUser } from '../api/api'
export default {
  name: 'UserManager',
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
      console.log(value)
      if (value === '' || value === undefined) {
        callback(new Error('密码不能为空'))
      } else {
        if (this.userModel.checkPass !== '') {
          // 调下面那个 两个密码校验
          this.$refs.userModel.validateField('checkPass')
        }
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
      addUserVisible: false,
      ListLoading: false,
      list: [],
      total: undefined,
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
      userInfo: {
        id: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: ''
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
    saveUser () {
      // 新增用户
      addUser(this.userModel).then(response => {
        if (response.code === 200) {
          this.addUserVisible = false
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.getUserList()
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      })
    },
    // 重置搜索 页面数据
    restRequestParams () {
      this.requestParams.mobile = ''
      this.requestParams.nickName = ''
      this.requestParams.isDelete = ''
      this.list = ''
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
    }
  }
}

</script>

<style lang="less" scoped>

</style>
