<template>
    <div style="height:100%">
        <el-container style="height:100%">
            <el-header>
                <el-row>
                    <el-col :span="8" style="text-align:left"><img src="@/assets/logo.png" alt=""></el-col>
                    <el-col :span="8"><h1  style="color:gold">四月是你的谎言鸭~</h1></el-col>
                    <el-col :span="8" style="text-align:right">
                        <span style="font-weight:bold">欢迎柠檬会员</span>  <a href="javascript:;" style="color:darkgreen" @click="loginout">安全退出</a></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!-- router 路由跳转相当于a链接 -->
                    <el-menu
                    :router="true"
                    default-active="/home/users"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/home/users">
                                <i class="el-icon-menu"></i>
                                <span>用户列表</span>
                            </el-menu-item>
                        </el-menu-item-group>             
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/home/roles">
                                <i class="el-icon-menu"></i>
                                <span>角色列表</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/home/power">
                                <i class="el-icon-menu"></i>
                                <span>权限列表</span>
                            </el-menu-item>
                        </el-menu-item-group>                  
                    </el-submenu>



                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginout(){
            this.$confirm('确定要退出登录吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
          localStorage.removeItem("token");
          this.$router.push("/login");
      }
    }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-col img{
      margin-top: 5px;
      width: 50px;
  }
</style>