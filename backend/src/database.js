const mysql = require("mysql2")

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'crud'
})

conexao.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Banco conectado com sucesso!")
    }
})


module.exports = conexao
