const user = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    user.createUser(nome, email, hash, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
      }
      return res.status(200).json({ message: "Usuário criado com sucesso!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

exports.login = (req,res)=>{
    const {email,senha} = req.body

    user.findByEmail(email,async(err,results)=>{
        if(err) return res.status(500).json({message:"Erro no servidor"})
        
        if(results.length === 0){
            return res.status(401).json({message:"Email nao encontrado"})
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(senha,usuario.senha)

        if(!senhaCorreta){
            return res.status(401).json({message:"Senha incorreta"})
        }

        req.session.user = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        return res.status(200).json({
            message:"Login realizado com sucesso!",
            user:req.session.user
        })
    })
    
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao fazer logout" });
        }

        res.clearCookie("connect.sid"); // remove o cookie da sessão
        return res.json({ message: "Logout realizado com sucesso" });
    });
};
