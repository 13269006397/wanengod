<template>
  <div class="header_userManager">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欣酋教育</el-breadcrumb-item>
      <el-breadcrumb-item>课程分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="cardClass">
      <!--栅格系统写头部区-->
      <el-row :gutter="10">
        <!--搜索与添加-->
        <el-col :span="3.5">
          <el-input
            clearable
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-circle-plus-outline" plain
            @click="openAddViews">添加</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="info" icon="el-icon-refresh-left" @click="OpendelSubjectVisible" plain>删除</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-top" plain>导入</el-button>
       </el-col>
        <el-col :span="1.5">
          <el-button type="warning" icon="el-icon-bottom" plain>导出</el-button>
        </el-col>
      </el-row>

      <!--内容区-->
     <div>
       <el-tree
         class="filter-tree"
         :data="data"
         :props="defaultProps"
         accordion
         :filter-node-method="filterNode"
         ref="tree">
       </el-tree>
     </div>

      <!--新增课程分类-->
      <el-dialog
        title="添加课程分类"
        style="text-align: center"
        :visible.sync="addSubjectVisible"
        width="55%">
        <el-form :model="subject" status-icon ref="subjectModel" label-width="100px">
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item label="课程分类">
                <el-select v-model="subject.level" clearable style="width: 100%;">
                  <el-option
                    v-for="item in level"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item v-if="subject.level == '01'" label="父级分类">
                <el-input maxlength="10" v-model="subject.parentName" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="6">
              <el-form-item v-if="subject.level == '02'" label="父级分类">
                <el-select v-model="subject.id" clearable style="width: 100%;">
                  <el-option
                    v-for="item in oneSubject"
                    :key="item.title"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item label="分类名称" >
                <el-input autocomplete="off" v-model="subject.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item label="排序" >
                <el-input type="number" v-model="subject.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addSubjectVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveSubject">确 定</el-button>
          </span>
      </el-dialog>

      <!--删除课程分类-->
      <el-dialog
        title="删除课程分类"
        style="text-align: center"
        :visible.sync="delSubjectVisible"
        width="55%">
        <el-form :model="delSubject" status-icon ref="delSubjectModel" label-width="100px">
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item label="课程分类">
                <el-select v-model="subject.level" clearable style="width: 100%;">
                  <el-option
                    v-for="item in level"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="6">
              <el-form-item v-if="subject.level == '02'" label="二级分类">
                <el-select v-model="delSubject.id" clearable style="width: 100%;">
                  <el-option
                    v-for="item in TwoSubject"
                    :key="item.title"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="6">
              <el-form-item v-if="subject.level == '01'" label="一级分类">
                <el-select v-model="delSubject.id" clearable style="width: 100%;">
                  <el-option
                    v-for="item in oneSubject"
                    :key="item.title"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delSubjectVisible = false">取 消</el-button>
            <el-button type="danger" @click="deleteSubject">删 除</el-button>
          </span>
      </el-dialog>

    </el-card>

  </div>
</template>
<script>
import { getSubjectTree, getOneSubjectList, getTwoSubjectList, saveSubject, deleSubject } from '@/api/eduProject/subject'
export default {
  name: 'teacher',
  filters: {},
  data () {
    return {
      delSubjectVisible: false,
      addSubjectVisible: false,
      delSubject: {
        id: undefined
      },
      total: undefined,
      ListLoading: false,
      list: [],
      requestParams: {
        id: '',
        name: '',
        page: 0,
        limit: 10
      },
      level: [{
        value: '01',
        label: '一级分类'
      }, {
        value: '02',
        label: '二级分类'
      }],
      filterText: '',
      data: [],
      oneSubject: [],
      TwoSubject: [],
      subject: {
        id: undefined,
        parentId: undefined,
        parentName: '顶节点',
        level: undefined,
        title: undefined,
        sort: undefined
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    this.getSubjectTree()
  },
  methods: {
    saveSubject () {
      if (this.subject.level === '01' && this.subject.parentName === '顶节点') {
        this.subject.parentId = '0'
      }
      if (this.subject.level === '02' && this.subject.id !== undefined) {
        this.subject.parentId = this.subject.id
      }
      saveSubject(this.subject).then(response => {
        if (response.code === 200) {
          this.addSubjectVisible = false
          this.getSubjectTree()
          this.$message({
            type: 'success',
            message: response.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    deleteSubject () {
      deleSubject(this.delSubject).then(response => {
        if (response.code === 200) {
          this.delSubjectVisible = false
          this.getSubjectTree()
          this.$message({
            type: 'success',
            message: response.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      })
    },
    openAddViews () {
      this.addSubjectVisible = true
      this.OneSubjectList()
    },
    OpendelSubjectVisible () {
      this.delSubjectVisible = true
      this.OneSubjectList()
      this.TwoSubjectList()
    },
    getSubjectTree () {
      // 获得课程分类树
      getSubjectTree().then(response => {
        if (response.code === 200) {
          this.data = response.data
        }
      })
    },
    OneSubjectList () {
      // 获得一级课程分类
      getOneSubjectList().then(response => {
        if (response.code === 200) {
          this.oneSubject = response.data
        }
      })
    },
    TwoSubjectList () {
      // 获得二级课程分类
      getTwoSubjectList().then(response => {
        if (response.code === 200) {
          this.TwoSubject = response.data
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>

<style lang="less">
  .cardClass{
    height: 600px;
  }
  .filter-tree{
    margin-top: 10px;
  }
</style>
