<template>

  <div class="header_userManager">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欣酋论坛</el-breadcrumb-item>
    </el-breadcrumb>

    <!--导航栏-->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input clearable placeholder="搜索内容"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input clearable placeholder="板块"></el-input>
        </el-col>
        <el-col :span="4">
            <el-date-picker
              style="width: 100%;"
              type="date"
              placeholder="发布日期">
            </el-date-picker>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-table
      border>

    </el-table>

  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="less" scoped>
  .el-row {
  }
  .el-card {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    transition: all .5s;
    background-color: coral;
  }

</style>
