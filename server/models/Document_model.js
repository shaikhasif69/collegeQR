const { ObjectId } = require("mongodb");
const documentCollection = require("../db").collection("Document");

let Document = function (data) {
  this.data = data;
  this.errors = [];
};

Document.prototype.createDocument = async function () {
  try {

    const result = await documentCollection.insertOne(this.data);
    if (result.acknowledged) {
      return "Document created successfully";
    } else {
      return "Failed to create document";
    }
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
};

Document.prototype.getAllDocuments = async function () {
  try {
    const documents = await documentCollection.find({}).toArray();
    if(!documents){
      return "Emtpy";
    }
    return documents
  } catch (error) {
    console.error(error);
    return [];
  }
};

Document.prototype.getDocumentById = async function (id) {
  try {
    const document = await documentCollection.findOne({ _id: new ObjectId(id) });
    console.log("this is the doc: " + document)
    return document;
  } catch (error) {
    console.error(error);
    return null;
  }
};

Document.prototype.getDocumentsByLabId = async function (labId) {
  try {
    const documents = await documentCollection.find({ lab: new ObjectId(labId) }).toArray();
    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = Document;
