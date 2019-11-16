<template>
    <div>
        <!-- <el-container> -->
            <!-- <el-header style="background-color:rgb(213, 219, 226);"> -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            <!-- </el-header>
        </el-container> -->
            <div >
                <!-- 搜索框 -->
                <div class="input">                 
                     <input type="text" placeholder="请输入内容" v-model="queryStr">
                     <el-button  class="btn" type="primary" icon="el-icon-search" @click="queryUserlist"></el-button>
                     <el-button class="btn" type="success" plain style="left:250px" @click="dialogFormVisible = true" >添加用户</el-button>               
                </div>
            </div>
            <!-- 添加用户页面 -->
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible" style="padding:100px" @close="showAdd">
                <el-form :model="addform" :rules="formrules" :ref="addform">
                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                        <el-input v-model="addform.username" autocomplete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
                        <el-input v-model="addform.password" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="addform.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                        <el-input v-model="addform.mobile" autocomplete="off"></el-input>
                    </el-form-item>   
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add" >确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改用户信息页面 -->
          <el-dialog title="修改用户信息"  :visible.sync="dialogUpdateVisible" >
                <el-form id="#update" :model="update" label-width="100px" :rules="updaterules" :ref="update">
                <el-form-item label="姓名" prop="username" value="">
                <el-input v-model="update.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                <el-input v-model="update.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="update.email"></el-input>
                </el-form-item>
                <!-- <el-form-item label="是否启用">
                <el-switch on-text="" off-text="" v-model="update.is_active"></el-switch>
                </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="updateLoading" @click="edit(update.curId)">确 定</el-button>
                </div>
         </el-dialog>
            <!-- 用户信息列表 -->
            <template>
                <el-table
                    :data="userList"
                    stripe
                    style="width: 100%;border-top:1px solid #ccc;">
                    <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="电话">
                    </el-table-column>
                     <el-table-column prop="address"
                        label="用户状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state"  @change="changeState(scope.row.id,scope.row.mg_state)">
                            </el-switch>
                         </template>
                    </el-table-column>
                     <el-table-column prop="address"
                        label="操作">
                       <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary" plain
                            icon="el-icon-edit"
                             @click="editSkip(scope.row)"></el-button>
                            <el-button
                            size="mini"
                            icon="el-icon-delete"
                            type="warning" plain
                            @click="del(scope.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination 
                style="padding-top:15px"
                background
                layout="prev, pager, next"
                :total="total" :page-size="pageSize" :current-page.sync="curpage"  @current-change="pageChange"	>
            </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
// import qs from "qs"
export default {
     data() {
    return {
      input: '',
      userList: [],
      //分页
      //总记录数
      total:0,
      //每页显示的数据数
      pageSize:5,
      //当前的页码
      curpage:1,
      //搜索框输入的内容
      queryStr:"",
        //添加用户表单
      dialogFormVisible: false,
        addform: {
          username: '',
          password:'',
          email: '',
          mobile: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        //表单规则约束
         formrules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur'},
              {min: 6, max: 25, message: '长度在 6 到 25 个字符' }],
          email: [
              { required: true, type: 'email', message: '邮箱格式不正确' }],
          phone: [
              { required: true, pattern: /^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}]
          },
        formLabelWidth: '120px',

        //修改用户表单
        dialogUpdateVisible:false,
        updateLoading:false,
        update:{
            curId:'',
          username: '',
          email: '',
          mobile: '',
        },
          //表单校验规则约束
         updaterules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
          email: [
              { required: true, type: 'email', message: '邮箱格式不正确' }],
          phone: [
              { required: true,pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入中国国内的手机号码'}]
          },
    
      value1: true,
         //用户状态按钮
    }
  },
     methods:{
        async getuserlist(curpage=1){
            // $http 是vue原型定义的属性全局组件使用
            let res=await this.$http.get("/users",{params:{
                query:this.queryStr,
                pagenum:curpage,
                pagesize:this.pageSize          
            },
            //需要授权的API在请求头使用Authorization字段 使用token
            headers:{"Authorization":localStorage.getItem("token")}
            })
            const{data,meta}=res.data;
           
            if(meta.status===200){
                this.userList=data.users;
                this.total=data.total;
                this.curpage=data.pagenum;
            }
            //从tp拿数据，先关掉token
            // await axios.get("http://www.anno.com/index.php/getusers").then(function(res){
            //     console.log(res);
            // })
            

        },
        //点击当前的页码显示相应列表数据
        pageChange(curpage){
            this.getuserlist(curpage);
        },
        //点击搜索按钮进行搜素显示数据在第一页
        queryUserlist(){
            this.curpage=1;
            this.getuserlist();
        },
        //添加用户根据提供的接口要求。
        add(){
             
        //    console.log(this.addform.validate);
        //    return false;
        //     this.addform.validate(valid=>{
        //         if(valid){
               
                    this.$http.post("/users",this.addform).then((res)=>{
                        const{data,meta}=res.data;
                        if(meta.status===201){
                            // this.userList.push(data);
                            this.$message.success(meta.msg);
                            this.dialogFormVisible = false;
                            this.getuserlist()
                        }
                        else{
                            this.$message({
                            message:meta.msg,
                            type: 'error',
                            duration:1000
                            });
                        }
                })   
                        // }else{
                        //   return false
                        // }
            // })  
    },
    showAdd(){
        // this.$refs.userAddForm.resetFields()
        // this.addform.resetFields();
    },
    //删除用户
    async del(uid){
         await this.$http.delete("/users/"+uid
        // {data:{id:uid}} 
        ).then(res=>{
           const{data,meta}=res.data;
           if(meta.status===200){
            //    this.$message.success(meta.msg);
                this.$confirm('确定要删除此用户吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                    
               this.getuserlist();
           }
        })
    },
    //修改用户信息把数据显示到修改表单中
    editSkip(datalist){
        this.update.curId=datalist.id;
        this.update.username=datalist.username;
        this.update.email=datalist.email;
        this.update.mobile=datalist.mobile;
        this.dialogUpdateVisible = true;
    },
    //修改数据
    edit(id){
        this.$http.put("/users/"+id,this.update).then(res=>{
            const{data,meta}=res.data;
            console.log(res);
            if(meta.status===200){
                 this.$message.success(meta.msg);
                 this.dialogUpdateVisible = false;
                 this.getuserlist();
            }
        })
    },
    //修改用户状态(当前的ID和状态)
    async changeState(id,state){
        let res=await this.$http.put(`/users/${id}/state/${state}`)
        const{ data,meta }=res.data;
        if(meta.status===200){
            this.$message({
                message:meta.msg,
                type:'success',
                duration:500
            })
        }
    }
    },
    //生命周期函数。让getuserlist自动执行
      created(){
        this.getuserlist();
      }
}
</script>

<style >

  .el-breadcrumb{
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    background-color: #D4DAE0;
  
}
.has-gutter{
    height: 50px;
}
.el-table__header-wrapper{
   height: 50px;
}
.el-table th>.cell{
    height: 100px;
    vertical-align: 0;
    font-size: 16px;

}
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
.input{
    position: relative;
    margin: 0;
    width: 400px;
    height: 36px;
}

.input input{
    position: absolute;
    left: 0;
    display: inline-block;
    padding-left: 5px;
    margin: 0;
    height: 36px;
    line-height: 36px;
}
.btn{
    position: absolute;
    top: 0;
    left: 177px;
    display: block;
}    



/* 添加对话框 */
.el-dialog__header{
    text-align: left;
    padding-left: 20px;
    line-height: 80px;
    font-weight: bold;

}
.el-dialog__title{
    font-size: 24px;
    color: aquamarine;
}
.el-dialog__body {
    padding-left: 30px;
    padding-right: 130px;
    padding-bottom: 0;
}
.el-dialog__footer{
    padding: 0;
    text-align: center;  
}

</style>