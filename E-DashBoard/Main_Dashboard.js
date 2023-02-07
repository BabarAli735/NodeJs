const express = require("express");
require("./db/config");
const app = express();
const Users = require("./db/Users");
const Products = require("./db/Products");
app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let result = await Users.findOne(req.body).select("email");
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "Invalid Request" });
  }
});
app.post("/add_products", async (req, res) => {
  let products = new Products(req.body);
  let result = await products.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Record Found" });
  }
});

app.delete('/product:id',(req,res)=>{
    res.send('working.....')
})
app.listen(5000);
