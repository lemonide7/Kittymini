const express=require('express')
const app=express()
app.listen(7000)
console.log('服务器启动成功')
//创建路由对象
const home=express.Router()
//为路由对象匹配请求路径
app.use('/home',home)
//创建二级路由
home.get('/list',(req,res)=>{
    res.send('欢迎来到lemon的家！~~')
})