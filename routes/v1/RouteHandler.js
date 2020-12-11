const express = require("express");
const { addWord } = require("../../controllers/v1/dictionary/addWord");
const { getAllWords } = require("../../controllers/v1/dictionary/getAllWords");
const { searchWord } = require("../../controllers/v1/dictionary/searchWord");

// CONFIGURE ROUTER
const Router = express.Router();

// HANDLE GET REQUEST
Router.get("/", getAllWords);
Router.get("/search", searchWord);

// HANDLE POST REQUEST
Router.post("/", addWord);

module.exports = Router;