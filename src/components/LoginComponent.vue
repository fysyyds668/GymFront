<template>
  <el-row class="container">
    <el-col :span="12" class="left-background"></el-col>
    <el-col :span="6" :offset="3" class="right-content">

      <el-form
          :model="formModel"
          :rules="rules"
          ref="form"
          class="form"
          v-if="isRegister">
        <el-form-item>
          <h1 style="font-weight: bold">注册</h1>
        </el-form-item>
        <el-form-item prop="account">
          <el-input v-model="formModel.account" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="register" type="primary" style="width: 100%">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <div @click="isRegister=false">
            <el-icon><Back /></el-icon>
            <a href="#" style="background: none;color: #181818;">返回</a>
          </div>
        </el-form-item>
      </el-form>

        <el-form
            :model="formModel"
            :rules="rules"
            ref="form"
            class="form"
            v-else>
          <el-form-item>
            <h1 style="font-weight: bold">登录</h1>
          </el-form-item>
          <el-form-item prop="account">
            <el-input v-model="formModel.account" :prefix-icon="User" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <div >
              <el-checkbox v-model="check" disabled>记住密码</el-checkbox>
            </div>
            <div class="el-link1">
              <el-link style="color: #ADD8E6 ;background: none">忘记密码?</el-link>
            </div>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">
              登录
            </el-button>
          </el-form-item>

          <el-form-item>
            <div @click="isRegister=true">
<!--              <a href="#" style="background: none;color: #181818;">去注册</a><el-icon><Right /></el-icon>-->
            </div>
          </el-form-item>
        </el-form>

    </el-col>
  </el-row>
</template>

<script setup>
import {userRegisterService, userLoginService, adminLoginService} from "@/api/user.js";
import {User, Lock, Right, Back} from "@element-plus/icons-vue";
import {ref, watch} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import {userUserStore} from "@/stores/index.js";

const isRegister=ref(false)
const form=ref()
const check=ref(true)
const isAdmin=ref('1')

const formModel=ref({
  account:'',
  password:'',
  repassword:''
})
const rules={
  account:[{required:true,message:'请输入用户名',trigger:'blur'},
    {max:10,message: "用户名最大为10位字符",trigger: 'blur'}],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'},
    {pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/,message:"密码必须由字母、数字组成，区分大小写,8-18位" ,trigger: 'blur' }],
  repassword:[
    {required:true,message:'请输入密码',trigger:'blur'},
    {pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/,message:"密码必须由字母、数字组成，区分大小写,8-18位" ,trigger: 'blur' },
    {
      validator:(rule,value,callback)=>{
        if(value!==formModel.value.password){
          callback(new Error('两次输入密码不一样'))
        }else{
          callback()
        }
      }
    }
]
}
const register=async ()=>{
  await form.value.validate();
  console.log("开始注册请求")
  const response=await userRegisterService(formModel.value)
  isRegister.value=false

}

watch(isRegister,()=>{
  formModel.value={
    account: '',
    password: '',
    repassword: ''
  }
})

const userStore=userUserStore()
const login=async ()=>{
  userStore.removeToken()
  await form.value.validate()
  console.log("开始登录请求")

  let response
  if(isAdmin.value==='1'){
    response=await adminLoginService(formModel.value)
  }else if(isAdmin.value==='2'){
    response=await userLoginService(formModel.value)
  }

  userStore.setToken(response.data.data)
  userStore.setUser(formModel.value.account,formModel.value.password)

  if(isAdmin.value==='1')
    router.push('home/homePage')
  else if(isAdmin.value==='2'){
    router.push('/userHome/userHomePage')
  }
}


</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.left-background {
  height: 100%;
  width: 100%;
  background: url('@/recourse/image/jpg1.jpg') no-repeat center center;
  border-radius: 0px 20px 20px 0px;
  border: none;
  background-size: cover;
}

.right-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.el-link1 {
  position: absolute;
  right: 0px;
}
.form{
  width: 100%;
}

</style>
