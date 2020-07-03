<template>
  <div class="main-body">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <div style="text-align: center">
      <el-col>
          <el-image
            style="width: 190px; height: 190px; border-radius: 50%;"
            :src="this.userModel.avatar"
            fit="fill">
          </el-image>
      </el-col>
      </div>
    </el-row>
    <el-row>
      <dev class="nikeName_user" style="text-align: center">
      <el-col>
          <p>
            <span style="font-size: 20px"> {{this.userModel.nickName}}</span>
          </p>
      </el-col>
      </dev>
    </el-row>
    <el-row>
      <dev class="nikeName_user" style="text-align: center;">
      <el-col>
          <p style="color: red">
            <span style="font-size: 17px"> 『 {{this.userModel.permission | permissionFilter}} 』</span>
          </p>
      </el-col>
      </dev>
    </el-row>
    <el-row>
      <dev>
        <el-tooltip content="修改个人资料" placement="top" :enterable="false" :open-delay="100">
        <el-button type="success" @click="updateUserView" style="float: right" icon="el-icon-edit" size="mini" circle></el-button>
        </el-tooltip>
      </dev>
      <el-col>
      </el-col>
    </el-row>

    <!--人员详情页-->
    <el-form :model="userModel" status-icon ref="userModel" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button round> id : {{ this.userModel.id }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-form-item>
              <el-button round> 手机号 : {{ this.userModel.mobile }}</el-button>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 姓名 : {{ this.userModel.nickName }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 性别 : {{ this.userModel.sex | sexFilter }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 出生日期 : {{ this.userModel.birthday | formatDate }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 邮箱 : {{ this.userModel.email }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="">
            <el-button round> 注册日期 : {{ this.userModel.regTime | formatAllDate }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 身份证号 : {{ this.userModel.idNumber }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 兴趣 : {{ this.userModel.interest }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 个性 : {{ this.userModel.personality }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 粉丝数 : {{ this.userModel.fansCount }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button round> 关注数 : {{ this.userModel.followCount }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

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
              <el-input type="password" v-model="updateUserModel.password" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="updateUserModel.checkPass" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="updateUserModel.age" maxlength="2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="updateUserModel.idNumber" type="text" maxlength="18" show-word-limit autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="updateUserModel.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="个性">
              <el-input v-model="updateUserModel.personality" maxlength="20" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
  </div>
</template>

<script>
import { findUserById, updateUserStatus } from '../api/api'
import { formatDate } from '../utils/date'
export default {
  name: 'SelfUserInfo',
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
          value = '管理员大人'
        }
        if (value === '02') {
          value = '平民! 也就是普通人'
        }
        if (value === '03') {
          value = '氪金大人'
        }
      }
      return value
    },
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatAllDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  data () {
    return {
      updateUserVisible: false,
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
      loginInfo: {
        phoneNumber: '',
        password: '',
        id: ''
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
        idNumber: '',
        regTime: undefined,
        personality: '',
        fansCount: '',
        followCount: ''
      }
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    // 修改角色信息
    updateUser () {
      updateUserStatus(this.updateUserModel).then(response => {
        if (response.code === 200) {
          this.updateUserCancel()
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
    },
    // 关闭修改用户页面
    updateUserCancel () {
      this.updateUserVisible = false
      this.updateUserModel = ''
      this.getParams()
    },
    // 打开修改用户页面
    updateUserView () {
      this.loginInfo.id = localStorage.getItem('userId')
      // 根据id查询当前人员信息
      findUserById(this.loginInfo).then(response => {
        if (response.code === 200) {
          this.updateUserModel = response.data.user
          this.updateUserModel.checkPass = this.updateUserModel.password
        }
      })
      this.updateUserVisible = true
    },
    getParams () {
      this.loginInfo.id = localStorage.getItem('userId')
      findUserById(this.loginInfo).then(data => {
        if (data.code === 200) {
          this.userModel = data.data.user
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nikeName_user {
}
</style>
