const { query } = require('express');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesystem',
    multipleStatements : true

});


db.connect(function (err) {
    if (err) throw err;
    console.log("connected!!");
});

app.post("/create", (req, res)=> {

    const name  = req.body.name;
    const age  = req.body.age;
    const country  = req.body.country;
    const position  = req.body.position;
    const salary  = req.body.salary;

    const sqlInsert = "insert into employees(name, age, country, position, salary)value (?,?,?,?,?)";

    db.query(sqlInsert, [name,age,country,position,salary], (err, result) =>{
      console.log(result);
    })
})

app.get("/employees", (req,res) => {
    db.query("select * from employees", (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.put('/update', (req, res) =>{

    const id = req.body.id;
    const salary = req.body.salary;

    db.query("update employees set  salary = ? where id = ?", [salary, id], (err, result) => {
        res.send(result)
    })
})

app.delete("/delete/:id", (req, res) => {

    const id = req.params.id
    
    db.query("delete from employees where id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("listening to port 3001");
})