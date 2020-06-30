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
          <el-col :span="3">
            <!--搜索与添加-->
            <el-input placeholder="手机号"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="用户分类"></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-circle-plus-outline">添加用户</el-button>
          </el-col>
        </el-row>

        <!--内容区-->
        <el-table
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
      </el-card>
    </div>
</template>

<script>
import { findUserList } from '../api/api'
export default {
  name: 'UserManager',
  data () {
    return {
      ListLoading: false,
      list: [],
      total: undefined,
      requestParams: {
        mobile: '',
        nickName: '',
        permission: '',
        page: 0,
        limit: 10
      },
      userInfo: {
        id: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 监听 用户状态的改变
    userStatusChange (userInfo) {
      console.log(userInfo)
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
