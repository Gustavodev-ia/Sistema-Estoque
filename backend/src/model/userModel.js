const db = require("../database");

exports.createUser = (nome, email, senha, callback) => {
  const SQL = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(SQL, [nome, email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao cadastrar usuário:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

exports.findByEmail = (email,callback) =>{
    const SQL = "SELECT * FROM usuarios WHERE email = ?"
    db.query(SQL,[email],(err,results)=>{
        if(err){
            console.log(err)
            return callback(err)
        }else{
            callback(null, results)
        }
    })
}
