
// importing mysql2
const mysql = require("mysql2");

//creating connection 
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "myDBuser",
  database: "myDB",
  port: 3306,
  multipleStatements: true,
});

//making sure that connection is created
mysqlConnection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});


//importing express
const express = require("express");

// creating server using express
const app = express();

// creating listening port
let port = 3006;
app.listen(port, () => {
  console.log("server running: 3006");
});



const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.post("/add-product", (req, res) => {

  let {
    product_name, 
    product_url, 
    product_brief_description, 
    product_description, 
    product_img, 
    product_link, 
    starting_price, 
    price_range, 
    user_name, 
    user_password} = req.body;


      let insertProduct = `
      INSERT INTO products (product_url,product_name) VALUES (?,?);`;

      mysqlConnection.query(insertProduct,[product_url,product_name], (err, result) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          console.log("Data inserted into product table successfully");
        }
      });

      const selectPID = `
      SELECT product_id FROM products WHERE product_name = "${product_name}"`;

      mysqlConnection.query(selectPID, (err, result) => {
        
        const PId = result[0].product_id;

        if (err) {
          console.log(err);
          res.end(err);
        } else {
          
          let insert_product_des = `
          INSERT INTO product_description(product_id,product_brief_description,product_description,product_img,product_link) VALUES (?,?,?,?,?);`;


          let insert_Product_price = `
          INSERT INTO product_price(product_id,starting_price,price_range) VALUES (?,?,?);`;


          mysqlConnection.query(
            insert_product_des,
            [
              PId,
              product_brief_description,
              product_description,
              product_img,
              product_link,
            ],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into description table successfully");
              }
            }
          );


          mysqlConnection.query(
            insert_Product_price,
            [PId,starting_price, price_range],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into Price table successfully");
              }
            }
          );


          let insert_user = `
          INSERT INTO users (user_name, user_password) VALUES (?,?);`;


          mysqlConnection.query(
            insert_user,
            [user_name, user_password],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into Users table successfully");
              }
            }
          );


          const selectUID = `
          SELECT user_id FROM users WHERE user_name = "${user_name}"`;


          mysqlConnection.query(selectUID,
            (err, result) => {
              
              const UId = result[0].user_id;
               if (err) {
                console.log(err);
                res.end(err);
               } 
               
               else {
                let insert_order = `
                INSERT INTO orders (product_id, user_id)
                VALUES (?,?);`;

                mysqlConnection.query(insert_order,[PId,UId], (err) => {
                       if (err) {
                         console.log(err);
                         res.end(err);
                       } else {
                         console.log(
                           "Data inserted into Orders table successfully"
                         );
                       }
                      });
                }
        })}

        
        res.send("Data inserted successfully");
      });

     
});

//Get all iphones
app.get("/iphones", (req, res)=>{
  let queryFromDB =
    "SELECT * FROM products JOIN product_description JOIN product_price ON products.product_id = product_description.product_id AND products.product_id = product_price.product_id";

  mysqlConnection.query(queryFromDB, 
    (err, rows)=>{
      let iphones = {products: []};
      iphones.products = rows;
      const stringIphones = JSON.stringify(iphones);
      if(!err) res.end(stringIphones);
      else console.log(err);
    }
  )
});

