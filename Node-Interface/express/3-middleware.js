const express=require('express')

const app=express()

app.listen(7000)
console.log('服务器启动成功!')

//请求处理的入口。
// app.use((req,res,next)=>{
//     res.send('当前网站正在维护。。。')
// })

//当业务逻辑比较复杂时，为了明确和便于维护，使用中间件来分配处理请求，
//app.use 用于处理http请求的中间件。
app.use('/request',(req,res,next)=>{
    console.log('中间件 -> request')
    next()
})

app.get('/list',(req,res)=>{
    res.send('/list')
})

app.get('/request',(req,res)=>{
    res.send('this is request method!')
})