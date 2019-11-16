export default {
    data(){
        return{
            rolelist:[],
            roleEditDialog:false,
            roleEdit:{
                roleName:'',
                roleDesc:''
            },
            roleEditrules: {
                roleName: [
                  { required: true, message: '请要修改输入角色名', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
                roleDesc: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
        }
    }
    },
    created(){
        this.getroleright();
    },
    methods:{
        //显示角色列表
        async getroleright(){
            let res=await this.$http.get("/roles")
            const{data,meta}=res.data;
            if(meta.status===200){
                this.rolelist=data;
            }
        },
        //将表格数据显示在修改页面
        roleEditshow(data){
            this.roleEditDialog=true;
            this.roleEdit=data;
        },
        //修改角色信息
        async roleUpdate(roledata){
            const{id,roleName,roleDesc}=roledata;
            let res= await this.$http.put('/roles/'+id,{
                roleName,
                roleDesc
            })
            const{data,meta}=res.data
            if(meta.status===200){
                this.$message.success("修改成功")
                this.roleEditDialog=false
                this.getroleright();
            } 
        },
        //删除角色信息
        roleDel(id){
                this.$confirm('您确认删除该角色吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.roleDelById(id)
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                  })
        },
        async roleDelById(id){
            let res=await this.$http.delete(`/roles/${id}`)
            const{data,meta}=res.data;
            if(meta.status===200){
                this.$message.success(meta.msg)
                this.getroleright();
            }
        },
        indexMethod (index) {
            return index
          },
    }
}