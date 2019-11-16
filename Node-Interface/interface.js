//express服务器创建
const express=require("express")
const app=express()
app.listen(7000,()=>{
    console.log('http://127.0.0.1:7000')
})
//数据库连接
const mysql=require('mysql')
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'interface'
})
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
//获取数据接口
app.get('/api/getheroes',(req,res)=>{
    const sqlStr='select * from heroes where isdel=0'
    conn.query(sqlStr,(err,results)=>{
        console.log(results)
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json({err_code:0,message:results})
    })
})
//根据Id获取相应数据
app.get('/api/gethero',(req,res)=>{
    const id=req.query.id
    const sqlStr='select * from heroes where id=?'
    conn.query(sqlStr,id,(err,results)=>{
        if(err) return res.json({err_code:1,message:'数据不存在',affectedRows:0})
        if(results.length!==1) return  res.json({err_code:1,message:'数据不存在',affectedRows:0})
        res.json({err_code:0,message:results})
    })
})
//删除数据根据ID
// app.get('/api/delhero',(req,res)=>{
//     const id=req.query.id
//     const sqlStr=''
// })
//添加数据
app.get('/api/addhero',(req,res)=>{
    const hero=req.body
    console.log(hero)
    const sqlStr='insert into heroes set ?'
    conn.query(sqlStr,hero,(err,results)=>{
        if(err) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        if(results.affectedRows!==1) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        res.json({err_code:0,message:results})
    })
})