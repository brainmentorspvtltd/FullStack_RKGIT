// Types of data
// - Structured - Tabular format- excel / csv / tsv
// - Unstructured - Images / audio / video / raw text
// - Semi-Structured - XML / JSON

// Types of NoSQL DB
// - Key Value Pair Based
//    - Data is stored in key and value pair...
//    - it is popular for storage like hashtables
//    - data could be in JSON / BSON
//    - redis, dynamo DB, Riak
// - Column Oriented
//    - data is stored in columns and we have some column family for each row and that column family contains key value pairs
//    - based on google big table
//    - HBase and Cassandra
// - Document Oriented
//    - collection of documents
//    - data is stored in key and value and here value could be another document
//    - MongoDB
// - Graph Based
//    - Graph Based databases are inspired from graph data structure
// --------------------------------------------------------
// MongoDB
// - document oriented NoSQL database
// - used for high volume data storage
// - instead of tables we create collections that contains data in key and value pair
// - collections contains set of documents
// ---------------------------------------------------
// MongoDB drivers are written on C++
// MongoDB enhance performance based on load of data
// if the load increases by adding more nodes (computers) the performance can be retained
// --------------------------------------------------
// Databases
// - show dbs;
// - use dbname;
//    - if database doesn't exist than it creates a new database and switch to that
//    - if database already exists than it simply switches to that database

// ---------------------------------------
// Collections
// - show collections;
// - db.createCollection(name, options)
//   options : 
//   - capped - true / flase
//   - max - 10 : only 10 documents are allowed
//   - size - size in bytes
//   - AutoIndexId - automatically creates index on ID field
// -------------------------------------------------------
// Data Types in MongoDB
// - Integer
// - Double
// - String
// - Boolean
// - Arrays
// - Object
// - Binary
// - Javascript
// - Date and TimeStamp
// ======================================
// CRUD Operations - Create Read Update Delete
// create - insert / insertOne / insertMany
// read - find / findOne
// update - updateOne / updateMany / replaceOne / findOneAndUpdate
// delete - deleteOne / deleteMany / remove
// --------------------------------------------------------------------
// Query Selectors & Projection Operators

// Query Selectors
// - Comparison
// - Array
// - Logical
// - Element
// - Comments
// --------------------------------------------------------------------
// Projections Operators
// $
// $elemMatch
// $meta
// $slice
// --------------------------------------------------------------------
// Comparison Operators
// - $eq
// - $gt
// - $lt
// - $gte
// - $lte
// - $in
// - $ne
// - $nin
// --------------------------------------------------------------------
// Logical Operators
// - $and
// - $or
// - $not
// - $nor
// --------------------------------------------------------------------
// Element Operators
// - $exists
// - $type
// --------------------------------------------------------------------
// Evaluation Operators
// - $expr
// - $regex
// - jsonSchema
// - $where



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

// filter data / where query
db.students.find({"name" :"Sachin"});

// Projection - get specific data only
db.students.find({}, {name : 1, age : 1});

db.students.find({}, {name : 1, age : 1, _id : 0});

// get data where age is greater than 20
db.students.find(
    {age : {$gt : 20}},
    {name : 1, age : 1, _id : 0}
);

// get data where age is less than 20
db.students.find(
    {age : {$lt : 20}},
    {name : 1, age : 1, _id : 0}
);

// get data where age is greater than equals to 20
db.students.find(
    {age : {$gte : 20}},
    {name : 1, age : 1, _id : 0}
);

db.students.find({
    $and : [{name : "Sachin"}, {age : {$gte : 20}}]
}, {name : 1, age : 1, _id : 0, "personal_details.phone" : 1});


db.students.find({
    name : {$in : ["Sachin", "John"]}
});


// Sort data
// Sorting in ascending order
db.students.find({},
    {name : 1, age : 1, sem : 1}).sort({age : 1});

// Sorting in descending order
db.students.find({},
    {name : 1, age : 1, sem : 1}).sort({age : -1});

// Pagination - use limit and skip
db.students.find({},
    {name : 1, age : 1, sem : 1}).sort({age : -1}).limit(2);

db.students.find({},
    {name : 1, age : 1, sem : 1}).sort({age : -1}).limit(2).skip(2);

db.students.find({},
    {name : 1, age : 1, sem : 1}).sort({age : -1}).limit(2).skip(3);


// Aggregate Pipeline
db.students.aggregate([
    {
        $match : {
            name : "Sachin"
        }
    },
    {
        $project : {
            name : 1,
            age : 1,
            sem : 1
        }
    }
]);

// Group By
// Aggregate Functions - SUM, MIN, MAX, AVG, COUNT
db.students.aggregate([
    {
        $group : {
            _id : {
                "semester" : "$sem"
            },
            totalStudent : {
                $sum : 1
            }
        }
    }
]);


// Joins
// aggregation - $lookup
// {
//     $lookup : {
//         from : collection to join,
//         localField : input field to join / primary key,
//         foreignField : field of collection to join,
//         as : output array field
//     }
// }

db.faculties.insertMany([
    {
        "name" : "Ram",
        "email" : "ram@gmail.com"
    },
    {
        "name" : "Ramesh",
        "email" : "ramesh12@gmail.com"
    },
    {
        "name" : "Kunal",
        "email" : "kunal11@gmail.com"
    },
]);

db.faculty_details.insertMany([
    {
        "email_id" : "ram@gmail.com",
        subjects : ["C++","Java","DBMS"],
        year : [1,2,4]
    },
    {
        "email_id" : "kunal11@gmail.com",
        subjects : ["Java","OS"],
        year : [3,4]
    }
]);

db.faculties.aggregate([
    {
        $lookup : {
            from : "faculty_details",
            localField : "email",
            foreignField : "email_id",
            as : "output"
        }
    }
]);

db.faculties.aggregate([
    {
        $lookup : {
            from : "faculty_details",
            localField : "email",
            foreignField : "email_id",
            as : "output"
        }
    },
    {
        $project : {
            name : 1,
            email : 1,
            "output.subjects" : 1,
            "output.year" : 1
        }
    }
]);