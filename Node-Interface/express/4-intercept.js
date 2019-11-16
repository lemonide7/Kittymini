const express=require('express')
const app=express()

app.listen(7000)
console.log('服务器启动成功！')

app.use('/admin',(req,res,next)=>{
    isLogin=false
    //用户是否登录
    if(!isLogin){
        res.send('请先登录，才能访问admin')
    }else{
        next()
    }
})
//如果用户登录由next到下一步的页面 
app.use('/admin',(req,res)=>{
    res.send('欢迎来到admin 管理页面~~')
})
//为客户端响应404状态码以及提示信息
app.use((req,res,next)=>{
    res.status(404).send('当前访问的页面不存在哦')
})