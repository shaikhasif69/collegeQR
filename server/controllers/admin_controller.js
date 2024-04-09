// Import necessary modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("../models/Admin_model");

exports.adminSignup = async (req, res) => {
  let admin = new Admin(req.body);
  let data = admin.createAdmin();
  res.status(200).json({ data });
};

exports.adminLogin = function (req, res) {
  console.log(req.body);
  let admin = new Admin(req.body);
  admin
    .login()
    .then(function (result) {
      console.log("this is the result: " + JSON.stringify(result));
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        res: result.res,
        // id: result._id,
      };
      console.log(
        "what is this data: " +
          JSON.stringify(data) +
          "and this is jwtToken: " +
          jwtSecretKey
      );
      const token = jwt.sign(data, jwtSecretKey);
      res.json({ token: token, res: result });
    })
    .catch(function (e) {
      console.log(e);
    });
};

exports.sendLoginLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({});

    await transporter.sendMail({
      to: email,
      subject: "Login to Admin Panel",
      html: `
        <p>Hello Admin,</p>
        <p>Please click <a href="http://localhost:3000/admin/login/${token}">here</a> to login to the Admin Panel.</p>
      `,
    });

    res.status(200).json({ message: "Login link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
