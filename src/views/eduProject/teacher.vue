<template>
  <div class="header_userManager">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欣酋教育</el-breadcrumb-item>
      <el-breadcrumb-item>讲师管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--栅格系统写头部区-->
          <el-row :gutter="10">
            <!--搜索与添加-->
            <el-col :span="3">
              <el-input v-model="requestParams.id"  clearable placeholder="讲师编号"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="requestParams.name"  clearable placeholder="姓名"></el-input>
            </el-col>
            <el-col :span="1.5">
              <el-button type="primary" icon="el-icon-search" @click="getList" plain>搜索</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="info" icon="el-icon-refresh-left" @click="restRequestParams" plain>重置</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" icon="el-icon-circle-plus-outline" plain>添加</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="danger" icon="el-icon-bottom"  plain>导入</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="warning" icon="el-icon-top" plain>导出</el-button>
            </el-col>
          </el-row>

      <!--内容区-->
      <el-table
        v-loading="ListLoading"
        :data="list"
        ref="teacherRef"
        max-height="460"
        border
        stripe>

        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-form-item label="讲师帅照:" class="itemColor">
                <el-avatar fit="fill" shape="circle" :src=props.row.avatar></el-avatar>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师编号:" class="itemColor">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师姓名:" class="itemColor">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师头衔:" class="itemColor">
                  <span>{{ props.row.level | levelFilter }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师资历:" class="itemColor">
                  <span>{{ props.row.career}}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="创建时间:" class="itemColor">
                  <span>  {{ props.row.gmtCreate | formatDate }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师简介:" class="itemColor">
                  <span>{{ props.row.intro}}</span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>

        <!--展示内容-->
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column label="讲师照片" class="itemColor" width="80" align="center">
          <template slot-scope="scope">
            <el-avatar fit="scale-down" shape="square" :src=scope.row.avatar></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="讲师编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="career"
          label="讲师资历"
          width="180">
        </el-table-column>
        <el-table-column
          label="讲师头衔"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.level | levelFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.isDeleted | idDeleteFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isDeleted"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="teacherStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.gmtCreate | formatAllDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="修改时间"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.gmtModified | formatAllDate }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template>
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
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
import { teacherList, updateTeacher } from '@/api/eduProject/teacher'
import { formatDate } from '@/utils/date'
export default {
  name: 'teacher',
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatAllDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    levelFilter (level) {
      if (level) {
        if (level === 1) {
          level = '高级讲师'
        }
        if (level === 2) {
          level = '首席讲师'
        }
      }
      return level
    },
    idDeleteFilter (value) {
      if (value) {
        if (value === '1') {
          value = '冻结'
        }
        if (value === '0') {
          value = '正常'
        }
      }
      return value
    }
  },
  data () {
    return {
      ListLoading: false,
      list: [],
      total: undefined,
      requestParams: {
        id: '',
        name: '',
        page: 0,
        limit: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 重置搜索 页面数据
    restRequestParams () {
      this.requestParams.id = ''
      this.requestParams.name = ''
      this.list = undefined
    },
    // 监听page size (limit)改变事件
    handleSizeChange (newSize) {
      this.requestParams.limit = newSize
      this.getList()
    },
    // 页码值 发生改变事件
    handleCurrentChange (newPage) {
      this.requestParams.page = newPage
      this.getList()
    },
    getList () {
      this.ListLoading = true
      teacherList(this.requestParams).then(data => {
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
    teacherStatusChange (row) {
      this.ListLoading = true
      updateTeacher(row).then(data => {
        this.ListLoading = false
        if (data.code === 200) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
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

<style lang="less">
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .itemColor .el-form-item__label{
    color: #0086b3;
  }
</style>
