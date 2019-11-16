const express=require('express')
const app =express()


home=app.get('/index',(req,res)=>{
    res.send("这是猪页面哦")
})

module.exports=home