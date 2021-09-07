require("../db")
const Celebrity = require("../models/Celebrity.model");

const celeb = [
    {name: "Samuel L. Jackson", occupation: "actor", catchPhrase: "mothersucker"},
    {name: "Bruce Willis", occupation: "actor", catchPhrase: "cool guys don't look at explosions"},
    {name: "Daniela Ruah", occupation: "actor", catchPhrase: "it looks like we have an open case"},
];

Celebrity.insertMany(celeb).then((celebsFromDB) => {
    console.log(`books created - ${celebsFromDB.length}`);
})