const express=require('express')
const app =express()


admin=app.get('/index',(req,res)=>{
    res.send("这是管理页面哦")
})

module.exports=admin