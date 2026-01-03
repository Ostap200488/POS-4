const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Table = require("../models/tableModel");

const createTable = async (req, res, next) => {
  try {
    const { name, seats } = req.body;

    if (!name || !seats) {
      return next(createHttpError(400, "Name and seats are required"));
    }

    const exists = await Table.findOne({ name });
    if (exists) {
      return next(createHttpError(409, "Table already exists"));
    }

    const table = await Table.create({ name, seats });
    res.status(201).json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ name: 1 });
    res.json({ success: true, data: tables });
  } catch (err) {
    next(err);
  }
};

const lockTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;

    const table = await Table.findOneAndUpdate(
      { name: tableNo, status: "Available" },
      { status: "Booked" },
      { new: true }
    );

    if (!table) {
      return next(createHttpError(409, "Table already booked"));
    }

    res.json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};

const unlockTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;

    const table = await Table.findOneAndUpdate(
      { name: tableNo },
      { status: "Available" },
      { new: true }
    );

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    res.json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTable,
  getTables,
  lockTable,
  unlockTable,
};
