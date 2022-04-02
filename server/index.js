const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gamblego"
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/insertAccount", (req, res) => {

    const OwnerNickname = req.body.OwnerNickname
    const Token = req.body.Token

    const sqlInsertA =
        "INSERT INTO cowner (OwnerNickname) VALUES (?)";
    const sqlInsertT =
        "INSERT INTO wallet (Token) VALUES (?)";
    db.query(sqlInsertA, [OwnerNickname], (err, result)=> {
        console.log(err)
        console.log(result)
    });
    db.query(sqlInsertT, [Token], (err, result)=> {
        console.log(err)
        console.log(result)
    });
});

app.get("/api/getAccounts", (req, res) => {
    const sqlSelect =
        "SELECT cowner.OwnerNickname AS AccountName, wallet.token AS Tokens FROM cowner LEFT JOIN wallet ON cowner.IDOwner = wallet.IDOwner";
    db.query(sqlSelect, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.get("/api/getCase", (req, res) => {
    const sqlSelect =
        "SELECT * FROM cases";
    db.query(sqlSelect, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.listen(3030, ()=> {
    console.log("running on port 3030");
})  