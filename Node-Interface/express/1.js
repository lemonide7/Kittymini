const express=require("express")

const app=express()

app.listen(7000)
console.log('网站服务器启动成功：7000')

app.get("/",(req,res)=>{
    res.send('HELLO express！！')
})

app.get('/list',(req,res)=>{
    res.send({name:'lemon',age:20})
})
