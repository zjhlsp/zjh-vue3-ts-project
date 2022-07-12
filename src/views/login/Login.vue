<template>
  <div class="login-container">
    <video
      class="background"
      src="../../assets/login.mp4"
      autoplay
      loop
      muted
    />
    <div class="welcome">
      <p>山野食堂</p>
    </div>
    <div class="login-form">
      <el-form
        ref="loginForm"
        label-position="left"
        label-width="80px"
        :model="formData"
        :rules="formValidator"
        style="max-width: 460px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model.trim="formData.username" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model.trim="formData.password"
            type="password"
          />
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="verifyCode"
        >
          <el-input
            v-model.trim="formData.verifyCode"
            type="text"
            style="width: 30%;"
          />
          <img
            :src="codeUrl"
            @click="getValidaCode"
          >
        </el-form-item>
      </el-form>
      <el-button
        type="warning"
        round
        size="large"
        style="width: 100%;"
        @click="login"
      >
        登录
      </el-button>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { loginAPI } from '@/api/login'

const formData = reactive({
  username: '',
  password: '',
  uuid: '',
  verifyCode: ''
})

const formValidator = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA_Z0-9]{2,10}$/, message: '请输入正确的用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入6-10位的密码', trigger: 'blur' },
    { min: 6, message: '请至少输入6位的密码', trigger: 'blur' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
})

const loginForm = ref()
const codeUrl = ref<string>('')

onMounted(() => {
  getValidaCode()
})
// 登录
const login = () => {
  loginForm.value.validate((value: boolean) => {
    if (value) {
      loginAPI.accountLogin(formData).then((res) => {
        console.log(res);
      })
    }
  })
}

// 获取验证码
const getValidaCode = () => {
  loginAPI.getVerifyCode().then((res) => {
    codeUrl.value = res.data.image
    formData.uuid = res.data.uuid
  })
}
</script>
<style lang='scss' scoped>
@import './login.scss';
</style>