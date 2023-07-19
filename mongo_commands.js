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


