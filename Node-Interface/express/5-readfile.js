const express=require('express')
const app=express()
const fs=require('fs')

app.listen(7000)
console.log('服务器启动成功')

app.get('/index',(req,res,next)=>{
    //文件读取
    fs.readFile('../files/lemon.txt','utf8',(err,data)=>{
        if(err==null){
            res.send(data)
        }else{
            //如果文件读取错误，则进入next处理
            next(err)
        }
    })
})
//错误处理中间件
app.use((err,req,res)=>{
    res.status(500).send(err.message)
})