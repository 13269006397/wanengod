<template>
  <el-container class="home-container">
    <!--头部区-->
    <el-header>
      <div class="home-header">
        <img src="../assets/image/home-logo.png" alt="">
        <span class="home-header-span">欣酋科技 · 猫wer网</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主题区-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-submenu index="1">
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
                  <span>角色管理</span>
                </template>
              </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">待办任务</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">业务查询</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">驾驶舱</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-apple"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { userList } from "../api/api";
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'home',
  data () {
    return {
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
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
  mounted: function () {
    this.loadData()
  },

  methods: {
    // 退出登录
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    loadData () {
      const param = { filter: this.filters.name }
      axios.post('/user/userlist', qs.stringify(param)).then(result => {
        const data = result.data
        this.userInfoList = data
      })
    },
    getUsers () {
      this.loadData()
    },
    addUser () {
      this.addFormData = {
        cId: '',
        cUsername: '',
        cPwd: ''
      }
      this.isView = true
      this.dialogVisible = true
      //    this.addFormReadOnly = false;
    },
    checkDetail (rowData) {
      this.addFormData = Object.assign({}, rowData)
      this.isView = false
      this.dialogVisible = true

      //    this.addFormReadOnly = true;
    },
    modifyUser (rowData) {
      this.addFormData = Object.assign({}, rowData)
      this.isView = true
      this.dialogVisible = true
      //    this.addFormReadOnly = false;
    },
    /*    deleteUser(rowData) {
      this.$alert("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
        callback: action => {
          const params = {
            userId: rowData.cId
          };
          axios.post("/user/delete", qs.stringify(params)).then(result => {
            console.info(result);
            if (result.data.success) {
              this.$message({
                type: "info",
                message: `已删除`
              });
            } else {
              this.$message({
                type: "info",
                message: `删除失败`
              });
            }
            this.loadData();
          });
        }
      });
    }, */
    // 增加一条记录
    addSubmit () {
      // 先判断表单是否通过了判断
      this.$refs.addFormData.validate(valid => {
        // 代表通过验证 ,将参数传回后台
        if (valid) {
          const param = Object.assign({}, this.addFormData)
          axios.post('/user/submit', qs.stringify(param)).then(result => {
            if (result.data.success) {
              this.$message({
                type: 'info',
                message: '添加成功'
              })
              this.loadData()
            } else {
              this.$message({
                type: 'info',
                message: '添加失败'
              })
            }
            this.dialogVisible = false
          })
        }
      })
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
    background: #969896;
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
</style>
