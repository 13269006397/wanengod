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

          <el-row :gutter="21" class="el-rowClass">
            <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 3 : 0">
              <el-card :body-style="{ padding: '0' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 0px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="18">
            <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 3 : 0">
              <el-card :body-style="{ padding: '0' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 0px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentDate: new Date()
    }
  }
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
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .el-rowClass {
    margin-top: 10px;
  }
</style>
