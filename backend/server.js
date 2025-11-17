const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/userRoutes");
const database = require("./src/database");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5501",  // onde está o frontend
    credentials: true
}));


app.use(session({
    secret: "chave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60,
        secure: false,         // true apenas HTTPS
        httpOnly: false        // se quiser acessar pelo JS
    }
}));

// ROTAS
app.use(routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});
