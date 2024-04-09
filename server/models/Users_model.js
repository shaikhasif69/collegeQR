const {ObjectId} = require("mongodb")
const userCollection = require("../db").collection("User")

let User = function(data){
  this.data = data;
  this.error = [];
}


User.prototype.cleanUp = function(){
  this.data ={
    username: this.data.username,
    email: this.data.email,
    password:this.data.password,
    createdOn: new Date()
  }
}


module.exports = User;