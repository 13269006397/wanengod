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
            v-model="requestParams.title"
            clearable
            placeholder="课程标题"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="requestParams.name"
            clearable
            placeholder="讲师姓名"
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
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            plain
            @click="addCourseView = true"
            >添加</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-upload
            class="upload-demo"
            action="http://localhost:8022/api-edu/easyExcel/readExcel"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button type="danger" icon="el-icon-top" plain>导入</el-button>
          </el-upload>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-bottom"
            plain
            @click="downloadExcel"
            >导出</el-button
          >
        </el-col>
      </el-row>

      <!--内容区-->
      <el-table
        v-loading="ListLoading"
        :data="list"
        ref="teacherRef"
        max-height="450"
        border
        stripe
      >
        <!--展开列-->

        <!--展示内容-->
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="id" label="课程id" width="180"></el-table-column>
        <!--<el-table-column prop="teacherId" label="课程讲师id" width="180"></el-table-column>-->
        <el-table-column
          prop="name"
          label="课程讲师姓名"
          width="120px"
        ></el-table-column>
        <!--<el-table-column prop="subjectId" label="课程专业id" width="180"></el-table-column>-->
        <!--<el-table-column prop="subjectName" label="二级课程专业" width="160px"></el-table-column>-->
        <!--<el-table-column prop="subjectParentId" label="课程专业父级id" width="200"></el-table-column>-->
        <!--<el-table-column prop="subjectParentName" label="一级课程专业" width="160px"></el-table-column>-->
        <el-table-column label="课程专业" width="200px">
          <template slot-scope="scope">
            {{ scope.row.subjectParentName }} --> {{ scope.row.subjectName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="课程标题"
          width="200"
        ></el-table-column>
        <el-table-column label="课程销售价格" width="140px">
          <template slot-scope="scope">
            {{ scope.row.price | priceFilter }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lessonNum"
          label="总课时"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="课程封面图片"
          class="itemColor"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar
              fit="scale-down"
              shape="square"
              :src="scope.row.cover"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyCount"
          label="销售数量"
          width="140px"
        ></el-table-column>
        <el-table-column
          prop="viewCount"
          label="浏览数量"
          width="140px"
        ></el-table-column>
        <el-table-column label="课程状态" width="140px">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
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
        <!--操作-->
        <el-table-column fixed="right" label="操作" width="120">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
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

    <!--新增课程-->
    <el-dialog
      title="发布新课程"
      style="text-align: center"
      :visible.sync="addCourseView"
      width="55%"
      class="pub_dialog"
    >
      <!--  1.基本信息  -->
      <el-form
        :model="addCourseData.addCourseModel"
        status-icon
        label-width="100px"
        ref="addCourseRef"
        v-if="active === 0"
      >
        <el-row class="rowClass">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="填写课程大纲"></el-step>
            <el-step title="课程息确认"></el-step>
          </el-steps>
        </el-row>
        <el-row class="rowClass1">
          <el-col :span="7">
            <el-form-item label="课程分类">
              <el-select
                v-model="addCourseData.addCourseModel.subjectParentId"
                placeholder="一级分类"
                @change="getTwoSubject"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in oneSubject"
                  :key="item.title"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程分类">
              <el-select
                v-model="addCourseData.addCourseModel.subjectId"
                placeholder="二级分类"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in twoSubject"
                  :key="item.title"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程标题">
              <el-input
                v-model="addCourseData.addCourseModel.title"
                placeholder="示例: 机器学习课:从入门到放弃"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="选择讲师">
              <el-select
                v-model="addCourseData.addCourseModel.teacherId"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in teacherList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程价格">
              <el-input
                type="number"
                v-model="addCourseData.addCourseModel.price"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="总课时">
              <el-input
                type="number"
                v-model="addCourseData.addCourseModel.lessonNum"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="课程简介">
              <quill-editor v-model="addCourseData.addCourseModel.description"></quill-editor>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程封面">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8022/api-user/user/upAvater"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="addCourseData.addCourseModel.cover"
                  :src="addCourseData.addCourseModel.cover"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否发布">
              <el-select
                v-model="addCourseData.addCourseModel.status"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--第二部分d-->
      <el-form
        :model="addCourseData.addCourseModel"
        status-icon
        label-width="100px"
        ref="addCourseRef"
        v-if="active === 1"
      >
        <el-row class="rowClass">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="填写课程大纲"></el-step>
            <el-step title="课程息确认"></el-step>
          </el-steps>
        </el-row>

        <el-row>
          <ul class="chanpterList">
            <li v-for="chapter in chapterList" :key="chapter.id" >
              {{chapter.title}}
              <ul class="videoList">
                <li v-for="video in chapter.children" :key="video.id" >
                  {{video.title}}
                </li>
              </ul>
            </li>

          </ul>
        </el-row>

      </el-form>

      <el-form
        :model="addCourseModel"
        status-icon
        label-width="100px"
        ref="addCourseRef"
        v-if="active === 2"
      >
        <el-row class="rowClass">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="填写课程大纲"></el-step>
            <el-step title="课程息确认"></el-step>
          </el-steps>
        </el-row>
        <el-row class="rowClass1">
          <el-col :span="11">
            <el-form-item label="33">
              <el-input v-model="addCourseModel.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="33">
              <el-input v-model="addCourseModel.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form
        :model="addCourseModel"
        status-icon
        label-width="100px"
        ref="addCourseRef"
        v-if="active === 3"
      >
        <el-row class="rowClass">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="填写课程大纲"></el-step>
            <el-step title="课程息确认"></el-step>
          </el-steps>
        </el-row>
        <el-row class="rowClass1">
          <span>
            <h1>新课程填写成功啦！!</h1>
            <h3>请点击保存 返回主界面！！</h3>
          </span>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="active === 1 || active === 2"
          style="margin-top: 12px;"
          @click="upNext"
          >上一步</el-button
        >
        <el-button v-if="active !== 3" style="margin-top: 12px;" @click="next"
          >下一步</el-button
        >
        <el-button v-if="active === 3" @click="saveCourse">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCourseList, saveCoreseBase } from '@/api/eduProject/courseManager'
import { teacherList } from '@/api/eduProject/teacher'
import { formatDate } from '@/utils/date'
import { getOneSubjectList, getSubjectTree } from '@/api/eduProject/subject'
import { getChapterList } from '@/api/eduProject/chapter'

import axios from 'axios'
export default {
  name: 'teacher',
  filters: {
    priceFilter (value) {
      if (value) {
        if (value.toString() !== '0') {
          return value
        }
      }
      return '免费观看'
    },
    statusFilter (value) {
      if (value) {
        if (value === '02') {
          value = '已发布'
        }
        if (value === '01') {
          value = '未发布'
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
      twoSubject: [],
      oneSubject: [],
      active: 0,
      teacherList: [],
      fileList: [],
      addCourseView: false,
      imagecropperKey: 0,
      imageCropperShow: false,
      updateTeacherVisible: false,
      addCourseModel: {
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
      // 后台传参
      addCourseData: {
        addCourseModel: {
          title: undefined,
          price: undefined,
          teacherId: undefined,
          lessonNum: undefined,
          description: undefined,
          subjectId: undefined,
          subjectParentId: undefined,
          status: undefined,
          cover: undefined,
          isDeleted: undefined,
          gmtCreate: undefined,
          gmtModified: undefined
        }
      },
      statusList: [
        {
          value: '01',
          label: '暂不发布'
        },
        {
          value: '02',
          label: '立即发布'
        }
      ],
      ListLoading: false,
      list: [],
      total: undefined,
      requestParams: {
        title: '',
        name: '',
        page: 0,
        limit: 10
      },
      findTeacherParams: {
        id: '',
        name: '',
        page: 0,
        limit: 300
      },
      AllData: [],
      chapterList: [],
      chapterParams: {
        courseId: '18'
      }
    }
  },
  created () {
    this.getList()
    this.getTeacherList()
    this.OneSubjectList()
    this.getSubjectTree()
    this.getChapterList()
  },
  methods: {
    getChapterList () {
      // 获得 章节小节树
      getChapterList(this.chapterParams).then(response => {
        if (response.code === 200) {
          this.chapterList = response.data
        }
      })
    },
    // 课程封面上传
    handleAvatarSuccess (res, file) {
      console.log(res)
      // 赋值给页面字段
      this.addCourseData.addCourseModel.cover = res.data.items
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // @change根据一级动态获取二级数据
    getTwoSubject (value) {
      // 一级subjectId值
      for (let i = 0; i < this.AllData.length; i++) {
        if (this.AllData[i].id === value) {
          this.twoSubject = this.AllData[i].children
          this.addCourseData.addCourseModel.subjectId = undefined
        }
      }
    },
    OneSubjectList () {
      // 获得一级课程分类
      getOneSubjectList().then(response => {
        if (response.code === 200) {
          this.oneSubject = response.data
        }
      })
    },
    getSubjectTree () {
      // 获得课程分类树
      getSubjectTree().then(response => {
        if (response.code === 200) {
          this.AllData = response.data
        }
      })
    },
    // 获取讲师列表
    getTeacherList () {
      this.ListLoading = true
      teacherList(this.findTeacherParams).then(data => {
        if (data.code === 200) {
          this.teacherList = data.data.items
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
    // 下一步
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 上一步
    upNext () {
      if (this.active > 0) {
        this.active--
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    // 保存
    saveCourse () {
      this.$refs.addCourseRef.resetFields()
      this.active = 0
      this.addCourseView = false
      /* saveCoreseBase(this.addCourseData).then(data => {
        if (data.code === 200) {
          this.getList()
          this.addCourseView = false
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
      }) */
    },
    // 重置搜索 页面数据
    restRequestParams () {
      this.requestParams.title = ''
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
      getCourseList(this.requestParams).then(data => {
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
    // 讲师导出
    downloadExcel () {
      axios
        .post('/api-edu/easyExcel/writeExcel', this.requestParams, {
          responseType: 'blob'
        })
        .then(_res => {
          // 将返回文件新建成为工作流
          const blob = new Blob([_res.data], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          const a = document.createElement('a')
          // 生成文件路径
          const href = window.URL.createObjectURL(blob)
          a.href = href
          const _fileName = _res.headers['content-disposition']
            .split(';')[1]
            .split('=')[1]
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
    height: 90%;
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
.rowClass {
  margin-top: 40px;
}
.rowClass1 {
  margin-top: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 145px;
  height: 145px;
  line-height: 145px;
  text-align: center;
}
.avatar {
  width: 165px;
  height: 165px;
  display: block;
}
.el-textarea__inner {
  margin-top: -15px;
}
.chanpterList{
  text-align: left;
  }
.videoList{
}
</style>
