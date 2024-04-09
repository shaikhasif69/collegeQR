const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const adminCollection = require("../db").collection("Admin");

let Admin = function (data) {
  this.data = data;
  this.errors = [];
};

Admin.prototype.cleanUp = function () {
  this.data = {
    username: this.data.username,
    email: this.data.email,
    password: this.data.password,
    role: "Admin",
    createdOn: new Date(),
  };
};

Admin.prototype.createAdmin = async function () {
  this.cleanUp();
  const existingAdmin = await adminCollection.findOne({
    email: this.data.email,
  });
  if (existingAdmin) {
    return "Admin with this username already exists. Please use another username.";
  }
  this.data.password = await bcrypt.hash(this.data.password, 10);
  let data = await adminCollection.insertOne(this.data);
  console.log("this is the data: " + JSON.stringify(data))
  if (data.acknowledged) {
    console.log("its true right ? ")
    return "ok";
  }
  return "fail";
};

Admin.prototype.login = async function () {
  try {
    console.log("email: " + this.data.email + "pass: " + this.data.password)
    this.cleanUp();
    const attemptedAdmin = await adminCollection.findOne({
      email: this.data.email,
    });
    console.log("this is the user i found : " + JSON.stringify(attemptedAdmin))

    if (
      attemptedAdmin &&
      bcrypt.compareSync(this.data.password, attemptedAdmin.password)
    ) {
      console.log("logged in succesful")
      return {res: "ok"};
    } else {
      console.log("why? can't you see me?")
      return {data:"fail"};
    }
  } catch (error) {
    console.log("Failed");
    return "Please Try again later.";
  }
};

Admin.prototype.getAdminById = async function (id) {
  let data = await userCollection.findOne({ _id: new ObjectId(id) });
  return data;
};

module.exports = Admin;
