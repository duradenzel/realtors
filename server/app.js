const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();

const auth = basicAuth({
  users: {
    admin: '123',
  },
});

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'realtors'
  })
  con.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  app.listen(PORT, () => console.log("Backend server live on " + PORT));
 
  app.get("/", (req, res) => {

    res.send({ message: "Online!" });
  });


  app.get("/GetHouses", (req, res) => {
 
    con.query('SELECT * FROM `houses`', function (err, results) {
      if (err) throw err
    else{
      res.send(results);
    }
    })
    
    });

    app.get("/GetHouse/:id", (req, res) => {
        console.log(req.params);
        con.query(`SELECT * FROM houses WHERE Id = ${parseInt(req.params.id)}`, function (err, results) {
          if (err) throw err
        else{
          console.log('succesfully fetched')
          res.send(results);
        }
        })
        
        });

        app.get("/DeleteHouse/:id", (req, res) => {
          console.log(req.params);
          con.query(`DELETE FROM houses WHERE Id = ${parseInt(req.params.id)}`, function (err, results) {
            if (err) throw err
          else{
            console.log('succesfully removed')
            res.send(results);
          }
          })
          
          });
          app.post('/AddHouse', (req, res) => {
            var house = req.body;
            
            
            con.query('INSERT INTO `houses`(`Straat`, `Plaats`, `PostCode`, `Provincie`, `Nummer`, `Kamers`, `Slaapkamers`, `Bouwjaar`, `Ligging`, `Oppervlakte`, `Type`, `Datum`, `Verkocht`, `Prijs`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [house.Straat, house.Plaats, house.PostCode, house.Provincie, house.Nummer, house.Kamers, house.Slaapkamers, house.Bouwjaar, house.Ligging, house.Oppervlakte, house.Type, house.Datum, house.Verkocht, house.Prijs], function (err, result) {
             if (err) throw err;
             else {
               console.log(result);
               
             }
           });
           
           })

           app.put('/UpdateHouse', (req, res) => {
            var house = req.body;
            console.log(house)
            
            con.query(`UPDATE houses SET Straat = ${house.Straat}, Plaats = ${house.Plaats}, PostCode = ${house.PostCode}, Provincie = ${house.Provincie}, Nummer = ${parseInt(house.Nummer)}, Kamers = ${parseInt(house.Kamers)}, Slaapkamers = ${parseInt(house.Slaapkamers)}, Bouwjaar = ${parseInt(house.Bouwjaar)}, Ligging = ${house.Ligging}, Oppervlakte = ${house.Oppervlakte}, Type = ${house.Type}, Datum = ${house.Datum}, Verkocht = ${house.Verkocht}, Prijs = ${parseInt(house.Prijs)} WHERE Id = ${house.Id}` , function (err, result) {
             if (err) throw err;
             else {
               console.log(result);
               
             }
           });
           
           })


           app.get('/authenticate', auth, (req, res) => {

            const options = {
              httpOnly: true,
              signed: true,
            };
         
            con.query(`SELECT * FROM users WHERE UserName = '${req.auth.user}' AND UserPassword = '${req.auth.password}'`, function (err, results) {
              if (err) throw err
            else{
              
              if(results.length > 0){
                res.cookie('name', 'admin', options).send({ screen: 'admin' });

              }
            }
            })
          });


          app.get('/clear-cookie', (req, res) => {
            res.clearCookie('admin').end();
           
          });

          app.get('/read-cookie', (req, res) => {
            if (req.signedCookies.name === 'admin') {
              res.send(req.signedCookies.name);
            }
          });