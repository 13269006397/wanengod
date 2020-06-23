<template>
  <el-container class="home-container">
    <!--头部区-->
    <el-header>
      <div class="home-header">
        <img src="../assets/image/home-logo.png" alt="">
        <span class="home-header-span">欣酋科技 · 猫wer网</span>
      </div>

      <el-menu :default-active="activeIndex" class="el-menu-home" mode="horizontal">

        <!--一级菜单-->
        <el-submenu index="1">
          <template slot="title">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </template>
          <!--二级菜单-->
          <el-menu-item index="1-1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>关于我的</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>订单管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2" @click="logout">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>退出</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <!--一级菜单-->
        <el-submenu index="2">
          <template slot="title">
            <el-badge :value="this.msg_five + this.msg_reply + this.msg_good" class="item">
              <span>消息中心</span>
            </el-badge>
          </template>
          <!--二级菜单-->
          <el-menu-item index="2-1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <el-badge :value="msg_good" class="item">
                <span>点赞</span>
              </el-badge>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <el-badge :value="this.msg_reply" class="item">
                <span>回复</span>
              </el-badge>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <el-badge :value="this.msg_five" class="item">
                <span>评论</span>
              </el-badge>
            </template>
          </el-menu-item>
        </el-submenu>

        <!--一级菜单-->
        <el-submenu index="3">
          <template slot="title">
            <span>个人中心</span>
          </template>
          <!--二级菜单-->
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>角色管理</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <!--页面主题区-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition = "false">
          <el-menu-item index="1">
            <i class="el-icon-truck"></i>
            <span slot="title">驾驶机舱</span>
          </el-menu-item>

          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">欣酋论坛</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>交易管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>订单查询</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="4">
            <i class="el-icon-apple"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>

          <!--一级菜单-->
          <el-submenu index="5" v-if="this.userInfo.permission === '01'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>权限管理</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { findUserById } from '../api/api'
export default {
  name: 'home',
  data () {
    return {
      isCollapse: false,
      msg_five: 11,
      msg_good: 8,
      msg_reply: 29,
      activeIndex: '1',
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      loginInfo: {
        phoneNumber: '',
        password: '',
        id: ''
      },
      userInfo: {
        id: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: ''
      },
      addFormData: {
        cId: '',
        cUsername: '',
        cPwd: ''
      },
      rules2: {
        cUsername: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        cPwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      filters: {
        name: ''
      }
    }
  },
  created () {
    this.getParams()
  },
  mounted: function () {

  },
  methods: {
    // 点击按钮切换侧菜单的折叠和展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    getParams () {
      this.loginInfo.id = this.$route.query.userId
      findUserById(this.loginInfo).then(data => {
        if (data.code === 200) {
          this.userInfo = data.data.user
          console.log(this.userInfo)
        }
      })
    },
    // 退出登录
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  .el-header{
    background: url("../assets/image/home-header-bg.jpg") repeat;
    background-size: cover;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 20px;
  }
  .el-aside{
    background: #545C64;
  }
  .el-menu {
    border-right: none;
  }
  .el-main{
    background: #dfe9fb;
  }
  .home-container{
    height: 100%;
  }
  .home-header{
    display: flex;
    align-items: center;
  }
  .home-header-span{
    margin-left: 8px;
  }
  .el-menu-home{
    background: none;
  }
  .item {
    margin-top: 0px;
    margin-right: 0px;
  }
  .el-badge__content.is-fixed{
    top: 12px;
    right: 6px;
  }
  .toggle-button {
    background-color: #ee9900;
    font-size: 10px;
    line-height: 24px;
    color: #fffdef;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
