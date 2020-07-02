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
        <el-button type="success" style="float: right" icon="el-icon-edit" size="mini" circle></el-button>
        </el-tooltip>
      </dev>
      <el-col>
      </el-col>
    </el-row>

    <!--人员详情页-->
    <el-form :model="userModel" status-icon ref="userModel" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="ID">
            <el-input v-model="userModel.id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userModel.mobile" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="姓名">
            <el-input v-model="userModel.nickName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="性别">
            <el-input v-model="userModel.sex" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出生日期">
            <el-input v-model="userModel.birthday" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="邮箱">
            <el-input v-model="userModel.email" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="注册日期">
            <el-input v-model="userModel.regTime" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="身份证号">
            <el-input v-model="userModel.idNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="兴趣">
            <el-input v-model="userModel.interest" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="个性">
            <el-input v-model="userModel.personality" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="粉丝数">
            <el-input v-model="userModel.fansCount" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="关注数">
            <el-input v-model="userModel.followCount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { findUserById } from '../api/api'

export default {
  name: 'SelfUserInfo',
  filters: {
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
    }
  },
  data () {
    return {
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
