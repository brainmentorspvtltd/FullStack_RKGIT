// check databases available
show dbs;

// create or switch database
use rkgit_db;

// check collections available in database
show collections;

// create collection
db.createCollection("students");

db.students.insertOne({name : "John", sem : 4, batch : 2022});

db.students.find();

db.students.insertMany([
    {
        "name" : "Sam",
        sem : 5,
        batch : 2021,
        phone : 9999875431,
        age : 20
    },
    {
        "name" : "Tom",
        sem : 8,
        batch : 2019,
        phone : 9900875431,
        age : 22
    },
]);

// Nested Document
db.students.insertOne({
    name : "Sachin",
    age : 20,
    sem : 5,
    batch : 2021,
    personal_details : {
        father_name : "Ramesh",
        phone : 9090764468
    },
    hobbies : ["cricket", "football", "chess", "swimming"]
});
