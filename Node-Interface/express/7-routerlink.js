const express=require('express')
const app=express()
app.listen(7000)
console.log('服务器成功启动')

const home=require('../route/home')
const admin=require('../route/admin')

app.use('/home',home)
app.use('/admin',admin)

