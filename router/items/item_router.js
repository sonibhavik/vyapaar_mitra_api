const express = require('express');
const addItem = require('../../controller/items/add_item');
const getItems = require('../../controller/items/get_item');
const updateItem = require('../../controller/items/update_item');
const itemRouter = express.Router();

itemRouter.post("/add-item", addItem);

itemRouter.put("/:id", updateItem);

itemRouter.get("/", getItems);

module.exports = itemRouter;