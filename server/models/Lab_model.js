const { ObjectId } = require("mongodb");
const labCollection = require("../db").collection("Lab");

let Lab = function (data) {
  this.data = data;
  this.errors = [];
};

Lab.prototype.cleanUp= function(){
  this.data = {
    labName : this.data.labName,
    labNum : this.data.labNum,
    labAssistant: this.data.labAssistant,
    createdAt: new Date(),
  }
}

Lab.prototype.createLab = async function(){
  this.cleanUp();
  const existingLab = await labCollection.findOne({labNum: this.data.labNum});
  if(existingLab){
    return "Lab already exists. Please create new."
  }
  let data = await labCollection.insertOne(this.data);
  console.log("this is the labData: " + JSON.stringify(data))
  if(data.acknowledged){
    return "ok";
  }
}



Lab.prototype.getAllLab = async function(){
  try {
    const lab = await labCollection.find({}).toArray;
    if(!lab){
      return "Empty"
    }
    return lab
  } catch (error) {
    console.error(error)
    return []
  }
}


Lab.prototype.getLabById  = async function(){
  try {
    const lab = await labCollection.findOne({_id: new ObjectId(id)})
    return lab
  } catch (error) {
    return null    
  }
}
module.exports = Lab;
