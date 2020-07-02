<template>
    <div>
    <span>个人资料</span>
    </div>
</template>

<script>
import { findUserById } from '../api/api'

export default {
  name: 'SelfUserInfo',
  data () {
    return {
      loginInfo: {
        phoneNumber: '',
        password: '',
        id: ''
      },
      userModel: {
        id: '',
        password: '',
        checkPass: '',
        mobile: '',
        avatar: '',
        nickName: '',
        permission: '',
        isDelete: '',
        age: '',
        sex: '',
        birthday: undefined,
        email: '',
        interest: '',
        idNumber: ''
      }
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    getParams () {
      this.loginInfo.id = localStorage.getItem('userId')
      findUserById(this.loginInfo).then(data => {
        if (data.code === 200) {
          this.userModel = data.data.user
          console.log(this.userModel)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
