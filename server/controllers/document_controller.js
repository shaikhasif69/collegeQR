const Document = require("../models/Document_model");

exports.addDocument = async (req, res) => {
  let document = new Document(req.body);
  let data = await document.createDocument();
  res.status(200).json({ data });
};

exports.getAllDocs = async (req, res) => {
  let document = new Document();
  let doc = await document.getAllDocuments();
  res.status(201).json({ data: doc });
};

exports.getDocById = async (req, res) => {
  let document = new Document();
  console.log("this is the id: " + req.params.id)
  let data = await document.getDocumentById(req.params.id);
  res.status(200).json({ data})
};
