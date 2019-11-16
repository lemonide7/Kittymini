const express=require('express')

const app=express()

app.listen(7000)
console.log('服务器启动成功，端口号：7000')

//next 当请求的两个路由相同时，用next即使相同路由也会跳转,否则只默认走第一个路由。
app.get('/request',(req,res,next)=>{
    req.name="lemon"
    console.log(res)
    next()
})

app.get('/request',(req,res,next)=>{
    res.send(req.name)
})
