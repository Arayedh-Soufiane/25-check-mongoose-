const express = require("express");
const mongoose = require("mongoose");
// Install and setup mongoose:

require("dotenv").config({ path: ".evn" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create a person having this prototype

var Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

//create Model

var personModel = mongoose.model("person", PersonSchema);

// Create and Save a Record of a Model

var person = new personModel({
  name: "rayenne",
  age: 18,
  favoriteFoods: ["kabeb", "pizza", "appel"],
});

person.save(function (err, data) {
  if (err) {
    console.log("err to save model");
  }
  console.log("element is added");
});

// Create Many Records with model.create()
var arrayOfPeople = [
  { name: "samir", age: 35, favoriteFoods: ["couscous", "appel"] },
  { name: "wahid", age: 40, favoriteFoods: ["orange", "chocola"] },
  { name: "kaled", age: 10, favoriteFoods: ["cacao", "fanta"] },
  { name: "bachir", age: 21, favoriteFoods: ["banana", "chocola"] },
];

personModel.create(arrayOfPeople, (err, data) => {
  if (err) console.log(err);
  else console.log(arrayOfPeople);
});
// Use model.find() to Search Your Database
personModel
  .find({ name: "samir" })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

//Use model.findOne() to Return a Single Matching Document from Database
personModel
  .findOne({ favoriteFoods: { $in: ["pizza"] } })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

//Use model.findById() to Search Your Database By _id

personModel
  .findById({
    _id: "5f1c7a01a7ba874ac8ed8adf",
  })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

//   Perform Classic Updates by Running Find, Edit, then Save

personModel.findById("5f1c7a502047a50c501b1463", (err, person) => {
  if (err) console.log(err);
  person.favoriteFoods.push("Touna");
  person.save((err, person) => {
    if (err) console.log(err);
    console.log(person);
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()

personModel.findOneAndUpdate(
  { name: "wahid" },
  { age: 20 },
  { new: true },
  (err, person) => {
    if (err) console.log(err);
    console.log(person);
  }
);

// Delete One Document Using model.findByIdAndRemove

personModel.findOneAndRemove("5f1c7a01a7ba874ac8ed8ae0", (err, person) => {
  if (err) console.log(err);
  console.log(person);
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()

personModel.deleteMany({ name: "Mary" }, (err, person) => {
  if (err) console.log(err);
  console.log("Person(s) with name 'samir' was deleted");
});
// Chain Search Query Helpers to Narrow Search Results

personModel
  .find({ favoriteFoods: { $in: ["Burrito"] } })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));
