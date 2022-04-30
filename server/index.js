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

app.delete("/api/deleteOneItem/:IDOwner/:IDItem", (req, res) =>{
    const DelOwnerID = req.params.IDOwner
    const DelItemID = req.params.IDItem
    const sqlSellDelete =
        "call pInventory_update(?, ?, ?)"
        db.query(sqlSellDelete, [DelOwnerID, DelItemID, -1], (err, result) => {
            if (err) console.log(err)
        })
})

app.delete("/api/deleteItem/:IDOwner/:IDItem", (req, res) =>{
    const DelOwnerID = req.params.IDOwner
    const DelItemID = req.params.IDItem
    console.log(DelOwnerID + "__" + DelItemID)
    const sqlSellDelete =
        "DELETE FROM `inventory` WHERE `IDOwner`= ? AND `IDItem` = ?;"
        db.query(sqlSellDelete, [DelOwnerID, DelItemID], (err, result) => {
            if (err) console.log(err)
        })
})

app.post("/api/insertItem", (req, res) => {
    const IDItem = parseInt(req.body.idItem)
    var UserID = parseInt(req.body.userID)
    const sqlSelect =
        "call pInventory_update(?, ?, 1)"
    db.query(sqlSelect, [UserID, IDItem], (err, result)=> {
        console.log(err)
        console.log(result)
    });
})

app.post("/api/setToken", (req, res) => {
    const Token = parseInt(req.body.Token)
    var UserID = parseInt(req.body.UserID)
    const sql =
        "UPDATE `cowner` SET `Token`= ? WHERE `IDOwner`= ?"
    db.query(sql, [Token, UserID], (err, result)=> {
        console.log(err)
        console.log(result)
    });
})

app.post("/api/insertAccount", (req, res) => {

    const OwnerNickname = req.body.OwnerNickname
    var Token = parseInt(req.body.Token)

    const sqlInsertA =
        "INSERT INTO `cowner` (OwnerNickname, Token) VALUES (?, ?)";

    db.query(sqlInsertA, [OwnerNickname, Token], (err, result)=> {
        console.log(err)
        console.log(result)
    });
});

app.delete("/api/delete/:IDOwner/", (req, res) =>{
    const DelID = req.params.IDOwner
    const sqlDeleteAccount =
        "DELETE FROM cowner WHERE IDOwner = ?"

        db.query(sqlDeleteAccount, DelID, (err, result) => {
            if (err) console.log(err)
        })
})

app.get("/api/getCaseContent/:caseID", (req, res) => {
    const caseID = req.params.caseID
    const sqlSelect =
    "SELECT item.IDItem, cskins.*,cquality.*, crarity.*, item.ItemPrice, cases.CaseImage, item.IDCase FROM item LEFT JOIN crarity ON item.IDRarity = crarity.IDRarity LEFT JOIN cskins ON item.IDSkin = cskins.IDSkin LEFT JOIN cquality ON item.IDQuality = cquality.IDQuality LEFT JOIN cases ON item.IDCase = cases.IDCase WHERE item.IDCase = ?";
        //"SELECT item.IDItem, cskins.*,cquality.*, crarity.*, item.ItemPrice FROM item LEFT JOIN crarity ON item.IDRarity = crarity.IDRarity LEFT JOIN cskins ON item.IDSkin = cskins.IDSkin LEFT JOIN cquality ON item.IDQuality = cquality.IDQuality WHERE item.IDCase = ?";
    db.query(sqlSelect, caseID, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.get("/api/getCase/:caseID", (req, res) => {
    const caseID = req.params.caseID
    const sqlSelect =
    "SELECT * FROM cases WHERE IDCase = ?";
    db.query(sqlSelect, caseID, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

        //"SELECT * FROM `item` WHERE IDCase = ? ORDER BY `IDSkin` ASC ";

app.get("/api/getAccounts", (req, res) => {
    const sqlSelect =
        "SELECT * FROM cowner";
    db.query(sqlSelect, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.get("/api/getInventory3/:UserID", (req, res) => {
    const UserID = req.params.UserID;
    const sqlSelect =
        "SELECT cowner.*, crarity.*, cquality.*, cskins.*, item.IDCase ,cases.CaseName, item.ItemPrice, item.IDItem, inventory.Amount FROM inventory LEFT JOIN item ON inventory.IDItem = item.IDItem LEFT JOIN cskins ON item.IDSkin = cskins.IDSkin LEFT JOIN cowner ON inventory.IDOwner = cowner.IDOwner LEFT JOIN crarity ON item.IDRarity = crarity.IDRarity LEFT JOIN cquality ON item.IDQuality = cquality.IDQuality LEFT JOIN cases ON item.IDCase = cases.IDCase WHERE inventory.IDOwner = ?"
    db.query(sqlSelect, UserID, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.get("/api/getCase", (req, res) => {
    const sqlSelect =
        "SELECT * from cases"
    db.query(sqlSelect, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.get("/api/getItems", (req, res) => {
    const sqlSelect =
        "SELECT item.IDItem, cskins.*,cquality.*, crarity.*, item.ItemPrice, cases.CaseImage, item.IDCase FROM item LEFT JOIN crarity ON item.IDRarity = crarity.IDRarity LEFT JOIN cskins ON item.IDSkin = cskins.IDSkin LEFT JOIN cquality ON item.IDQuality = cquality.IDQuality LEFT JOIN cases ON item.IDCase = cases.IDCase "
    db.query(sqlSelect, (err, result)=> {
        //console.log(err)
        res.send(result)
    });
})

app.listen(3030, ()=> {
    console.log("running on port 3030");
})  