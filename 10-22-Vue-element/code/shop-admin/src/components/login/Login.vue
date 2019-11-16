<template>
  <div class="wrapper">
      <el-row :gutter="10" type="flex" class="login" justify="center" align="middle">
             <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" class="loginForm"><div class="grid-content bg-purple"></div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
        ruleForm: {
            username: "admin",
            password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "请输入不少于6位的密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      async login(){
           axios.post("http://localhost:8888/api/private/v1/login",this.ruleForm)
           .then((res)=>{
              let data=res.data.data;
              let meta=res.data.meta;
              if(meta.status===200){
                  this.$router.push("./home")
                  localStorage.setItem("token",data.token)
              }else{
                    this.$message({
                    message:meta.msg,
                    type: 'error',
                    duration:1000
                    });
              }
           })
          //tp接口
          // await axios.post("http://www.anno.com/index.php/login",{
          //   params:{
          //     username:"lemon",
          //     password:123456
          //   }}).then(res=>{
          //   console.log(res);
          // })
              
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.login()
        } else {
        console.log('error submit!!');
            return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.wrapper{
    height: 100%;
    margin-right: 0px;
    background-color:darkslategray;
}
.login{
    margin: 0;
    height: 100%;
}
.loginForm{
    margin: 0;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    min-width: 300px;
}
.demo-ruleForm{
   padding: 10px 20px;
    
}
</style>
