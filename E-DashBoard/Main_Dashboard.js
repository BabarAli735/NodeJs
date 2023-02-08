const express = require("express");
const MultiParty = require("multiparty");
require("./db/config");
const app = express();
const Users = require("./db/Users");
const Products = require("./db/Products");
const Images_Upload_Dir = "./public/images";
const IMAGE_BASE_URL = "http://localhost:5000/images/";
app.use(express.json());
app.use(express.static("public"));
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

app.get("/", (req, res) => {
  console.log("Home");
  res.send("Home ..");
});
app.post("/Add_Product_Form", async (req, res) => {
  let form = new MultiParty.Form({ uploadDir: Images_Upload_Dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.send({ error: err.message });
    console.log(`Feilds ${JSON.stringify(fields, null, 2)}`);
    console.log(`Feilds ${JSON.stringify(files, null, 2)}`);
    const filepath = files.Image[0].path;
    const ImageFileName = filepath.slice(filepath.lastIndexOf("\\") + 1);
    const imageUrl = IMAGE_BASE_URL + ImageFileName;
    const product = new Products({
      title: fields.title[0],
      price: fields.Price[0],
      image: imageUrl,
    });

    try {
      const pro = await product.save();
      console.log(`Product ${JSON.stringify(pro)}`);
      res.send(pro);
    } catch (err) {
      console.log(err);
      res.send({ error: err.message });
    }
  });
});
app.listen(5000);
