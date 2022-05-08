const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gamblego1"
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

db.query("SET GLOBAL FOREIGN_KEY_CHECKS=0")

/**inventory, upgrader */
app.delete("/api/deleteItem/:IDOwner/:IDItem", (req, res) =>{
    const DelOwnerID = req.params.IDOwner
    const DelItemID = req.params.IDItem
    const sqlSellDelete =
        "call pInventory_delete(?, ?)"
        db.query(sqlSellDelete, [DelOwnerID, DelItemID], (err, result) => {
        })
})

/**inventory, upgrader */
app.delete("/api/deleteOneItem/:IDOwner/:IDItem", (req, res) =>{
    const DelOwnerID = req.params.IDOwner
    const DelItemID = req.params.IDItem
    const sqlSellDelete =
        "call pInventory_update(?, ?, ?)"
        db.query(sqlSellDelete, [DelOwnerID, DelItemID, -1], (err, result) => {
        })
})

/**case_detail, upgrader */
app.post("/api/insertItem", (req, res) => {
    const IDItem = parseInt(req.body.idItem)
    var UserID = parseInt(req.body.userID)
    const sqlSelect =
        "call pInventory_update(?, ?, 1)"
    db.query(sqlSelect, [UserID, IDItem], (err, result)=> {
    });
})

/**accounts */
app.delete("/api/deleteAccount/:IDOwner/", (req, res) =>{
    const DelID = req.params.IDOwner
    const sqlDeleteAccount =
        "call pOwner_delete(?)"

        db.query(sqlDeleteAccount, DelID, (err, result) => {
        })
})

/**accounts */
app.post("/api/insertAccount", (req, res) => {

    const OwnerNickname = req.body.OwnerNickname
    var Token = parseInt(req.body.Token)

    const sqlInsertA =
        "call pOwner_insert(?, ?)";

    db.query(sqlInsertA, [OwnerNickname, Token], (err, result)=> {
    });
});

/**inventory, case_detail, navbar */
app.post("/api/setToken", (req, res) => {
    const Token = parseInt(req.body.Token)
    var UserID = parseInt(req.body.UserID)
    const sql =
        "call pWallet_update(?, ?)"
    db.query(sql, [UserID, Token], (err, result)=> {
        console.log(err)
        console.log(result)
    });
})

/**case_detail */
app.get("/api/getCaseContent/:caseID", (req, res) => {
    const caseID = req.params.caseID
    const sqlSelect =
        "call pCaseItem_select(?)"
    db.query(sqlSelect, caseID, (err, result)=> {
        res.send(result[0])
    });
})

/**case_detail */
app.get("/api/getCase/:caseID", (req, res) => {
    const caseID = req.params.caseID
    const sqlSelect =
    "call  pCase_select(?)";
    db.query(sqlSelect, caseID, (err, result)=> {
        res.send(result[0])
    });
})

/**App, accounts */
app.get("/api/getAccounts", (req, res) => {
    const sqlSelect =
        "call pOwners_select";
    db.query(sqlSelect, (err, result)=> {
        res.send(result[0])
    });
})

/**case_detail, cases */
app.get("/api/getCase", (req, res) => {
    const sqlSelect =
        "call pCases_select"
    db.query(sqlSelect, (err, result)=> {
        res.send(result[0])
    });
})

/**upgrader */
app.get("/api/getItems", (req, res) => {
    const sqlSelect =
        "call pItems_select"
        db.query(sqlSelect, (err, result)=> {
        res.send(result[0])
    });
})

/**contracts, inventory, upgrader */
app.get("/api/getInventory3/:UserID", (req, res) => {
    const UserID = req.params.UserID;
   const sqlSelect = 
   "call pInventory_select(?) "
        db.query(sqlSelect, UserID, (err, result)=> {
        res.send(result[0])
    });
})

app.listen(3030, ()=> {
    console.log("running on port 3030");
})  