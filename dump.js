const UserModel = require("./models/user");
const ProductModel = require("./models/product");
const UserViewModel = require("./models/userView");
const faker = require("faker");
const mongoose = require("mongoose");

/**
|--------------------------------------------------
| Insert Users
|--------------------------------------------------
*/

const insertBulkUserData = async () => {
  try {
    const users = [];
    for (let index = 0; index < 500; index++) {
      let randomName = faker.name.findName();
      let randomEmail = faker.internet.email();
      users.push({
        name: randomName,
        email: randomEmail
      });
    }
    await UserModel.create(users);
    console.log("Data Instered Successfully!");
  } catch (error) {
    console.log("Insert bulk user", error);
  }
};
/**
|--------------------------------------------------
| UserView
|--------------------------------------------------
*/

const insertUserView = async () => {
  try {
    const userData = await UserModel.find().select("_id");
    const productData = await ProductModel.find().select("_id");
    let userArray = userData;
    let productArray = productData;
    for (let i = 0; i < 100; i++) {
      const userView = [];
      for (let index = 0; index < 1000; index++) {
        var randomUserId =
          userArray[Math.floor(Math.random() * (userArray.length - 1))];
        var randomProductId =
          productArray[Math.floor(Math.random() * (productArray.length - 1))];
        userView.push({
          userId: randomUserId._id,
          productId: randomProductId._id,
          viewDate: faker.date.past(1)
        });
      }
      await UserViewModel.create(userView);
      console.log("====================================");
      console.log("%d views inserted successfully.", 1000 * (i + 1));
      console.log("====================================");
    }
    console.log("Users product view inserted successfully!");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
/**
|--------------------------------------------------
| Insert Products
|--------------------------------------------------
*/

const insertBulkProductData = async () => {
  try {
    const products = [];
    for (let index = 0; index < 10; index++) {
      const randomName = faker.internet.domainName();
      products.push({
        productName: randomName
      });
    }
    await ProductModel.create(products);
    console.log("Products inserted successfully.");
  } catch (error) {
    console.log("Products bulk user", error);
  }
};

const dump = async () => {
  mongoose.connect(
    "mongodb://localhost:27017/task",
    {
      useNewUrlParser: true
    },
    async () => {
      await insertBulkUserData();
      await insertBulkProductData();
      await insertUserView();
      return;
    }
  );
};

dump();
