<template>
  <div class="header_userManager">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-table :data="permissionList">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称"></el-table-column>
          <el-table-column label="路径"></el-table-column>
          <el-table-column label="权限等级"></el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  data () {
    return {
      // 权限列表
      permission: []
    }
  },
  created () {
    // 获取所有权限
    this.getPermission()
  },
  methods () {
    // 获取权限列表

  }
}
</script>

<style scoped>

</style>
