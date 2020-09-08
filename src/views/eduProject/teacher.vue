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
          <el-input
            v-model="requestParams.id"
            clearable
            placeholder="讲师编号"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="requestParams.name"
            clearable
            placeholder="姓名"
          ></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-search" @click="getList" plain
            >搜索</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="info"
            icon="el-icon-refresh-left"
            @click="restRequestParams"
            plain
            >重置</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-circle-plus-outline" plain
            >添加</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" icon="el-icon-bottom" plain>导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" icon="el-icon-top" plain @click="downloadExcel">导出</el-button>
        </el-col>
      </el-row>

      <!--内容区-->
      <el-table
        v-loading="ListLoading"
        :data="list"
        ref="teacherRef"
        max-height="460"
        border
        stripe
      >
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-form-item label="讲师帅照:" class="itemColor">
                  <el-avatar
                    fit="fill"
                    shape="circle"
                    :src="props.row.avatar"
                  ></el-avatar>
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
                  <span>{{ props.row.career }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="创建时间:" class="itemColor">
                  <span> {{ props.row.gmtCreate | formatDate }}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="讲师简介:" class="itemColor">
                  <span>{{ props.row.intro }}</span>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>

        <!--展示内容-->
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column
          label="讲师照片"
          class="itemColor"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar
              fit="scale-down"
              shape="square"
              :src="scope.row.avatar"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="讲师编号" width="180">
        </el-table-column>
        <el-table-column prop="career" label="讲师资历" width="180">
        </el-table-column>
        <el-table-column label="讲师头衔" width="180">
          <template slot-scope="scope">
            {{ scope.row.level | levelFilter }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            {{ scope.row.isDeleted | idDeleteFilter }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isDeleted"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="teacherStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.gmtCreate | formatAllDate }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.gmtModified | formatAllDate }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateTeacherView(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
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
        :total="this.total"
      >
      </el-pagination>
    </el-card>

    <!--修改用户对话框-->
    <el-dialog
      title="修改讲师"
      style="text-align: center"
      :visible.sync="updateTeacherVisible"
      width="55%"
      class="pub_dialog"
    >
      <el-form
        :model="updateTeacherModel"
        status-icon
        ref="updateTeacherModel"
        label-width="100px"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item>
              <!--头像略缩图-->
              <pan-thumb :image="updateTeacherModel.avatar">
                <!--上传按钮-->
                <el-button
                  type="primary"
                  icon="el-icon-upload"
                  @click="imageCropperShow = true"
                >
                  更换头像
                </el-button>
              </pan-thumb>
              <image-cropper
                v-show="imageCropperShow"
                :width="300"
                :height="300"
                :key="imagecropperKey"
                url="http://localhost:8022/api-user/user/upAvater"
                field="file"
                @close="close"
                @crop-upload-success="cropSuccess"
                @crop-upload-fail="cropFailed"
              >
              </image-cropper>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="讲师编号">
              <el-input v-model="updateTeacherModel.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="讲师姓名">
              <el-input v-model="updateTeacherModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="讲师头衔">
              <el-select
                v-model="updateTeacherModel.level"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in teacherLevel"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="讲师资历">
              <el-input v-model="updateTeacherModel.career"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="讲师简介">
              <el-input
                v-model="updateTeacherModel.intro"
                type="textarea"
                maxlength="1000"
                :autosize="{ minRows: 6, maxRows: 7 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateTeacherCancel">取 消</el-button>
        <el-button type="primary" @click="updateTeacher">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { teacherList, updateTeacher, findTeacherById } from '@/api/eduProject/teacher'
import { formatDate } from '@/utils/date'
import PanThumb from '../../components/PanThumb/index'
import axios from 'axios'
import ImageCropper from '../../components/ImageCropper'
export default {
  name: 'teacher',
  components: { PanThumb, ImageCropper },
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
      imagecropperKey: 0,
      imageCropperShow: false,
      updateTeacherVisible: false,
      updateTeacherModel: {
        id: undefined,
        name: undefined,
        intro: undefined,
        career: undefined,
        level: undefined,
        avatar: undefined,
        sort: undefined,
        isDeleted: undefined,
        gmtCreate: undefined,
        gmtModified: undefined
      },
      ListLoading: false,
      list: [],
      total: undefined,
      requestParams: {
        id: '',
        name: '',
        page: 0,
        limit: 10
      },
      updateParams: {
        id: '',
        name: '',
        page: 0,
        limit: 10
      },
      teacherLevel: [
        {
          value: 1,
          label: '高级讲师'
        },
        {
          value: 2,
          label: '首席讲师'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    updateTeacher () {
      this.$refs.updateTeacherModel.validate(valid => {
        if (valid) {
          updateTeacher(this.updateTeacherModel).then(response => {
            if (response.code === 200) {
              this.updateTeacherVisible = false
              this.getList()
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
        }
      })
    },
    close () {
      this.imageCropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess (data) {
      // 上传头像返回图片地址
      this.updateTeacherModel.avatar = data.items
      this.imagecropperKey = this.imagecropperKey + 1
      this.imageCropperShow = false
    },
    cropFailed (data) {
      console.log('fail' + data)
    },
    // 关闭修改用户页面
    updateTeacherCancel () {
      this.updateTeacherVisible = false
      this.$refs.updateTeacherModel.resetFields()
      this.updateTeacherModel = {}
    },
    // 打开修改弹窗
    updateTeacherView (id) {
      this.updateParams.id = id
      // 根据id查询当前人员信息
      findTeacherById(this.updateParams).then(response => {
        if (response.code === 200) {
          this.updateTeacherModel = response.data.items
        }
      })
      this.updateTeacherVisible = true
    },
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
    },
    // 讲师导出
    downloadExcel () {
      axios.post('/api-edu/easyExcel/writeExcel', this.requestParams, { responseType: 'blob' }).then((_res) => {
        // 将返回文件新建成为工作流
        const blob = new Blob([_res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
        const a = document.createElement('a')
        // 生成文件路径
        const href = window.URL.createObjectURL(blob)
        a.href = href
        const _fileName = _res.headers['content-disposition'].split(';')[1].split('=')[1]
        // 文件名中有中文 则对文件名进行转码
        a.download = decodeURIComponent(_fileName)
        // 利用a标签做下载
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(href)
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
.itemColor .el-form-item__label {
  color: #0086b3;
}
.pub_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 85%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
    .el-dialog__footer {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 8888;
    }
  }
}
</style>
