require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./model/User").User;
const Product = require("./model/Product").Product;
const UserProductRelationship = require("./model/UserProductRelationship").UserProductRelationship;
const db = require("./database");

const port = 3000;

app.use(bodyParser.json());

app.post("/createScraper", async(req, res) => {
  const { body } = req;
  const { countryCode, asin, email } = body;

  const user = new User(email);
  await user.persist();
  const product = new Product(asin, countryCode);
  await product.persist();
  const userProductRelationship = new UserProductRelationship(user.id, product.id);
  await userProductRelationship.persist();

  res.send("success");
});

app.delete("/user/:id", async(req, res) => {
  const { id } = req.params;

  try {
    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = '${id}';
    `;
    const deleteUserResponse = await db.query(deleteUserQuery);
    console.log(deleteUserResponse);
    res.send("success");
  } catch(error) {
    console.log(error, "error");
  }
});

app.delete("/userProduct/:userId/:productId", async(req, res) => {
  const { userId, productId } = req.params;

  try {
    const deleteRelationQuery = `
      DELETE FROM user_product_relationship
      WHERE user_id = '${userId}' AND product_id='${productId}';
    `;
    const deleteRelationResponse = await db.query(deleteRelationQuery);
    console.log(deleteRelationResponse);
    res.send("success");
  } catch(error) {
    console.log(error, "error");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

