//Lean you mongo - My Solutions
function challenge3() {
    var mongo = require("mongodb").MongoClient;
    // var url = "./mongodb://mrcodex-learnyoumongo-4310431:27017/learnyoumongo"
    var url = "mongodb://localhost:27017/learnyoumongo";
    mongo.connect(url, function(err, db) {
        if(err) {
            throw err;
        }
        db.collection("parrots").find({
            age: {
                $gt: +process.argv[2]
            }
        }).toArray(function(err, documents) {
            if(err) {
                throw err;
            }
            console.log(documents);
            // documents.forEach(document => console.log(document));
            db.close();
        });
    });
}
// challenge3();

function challenge4() {
    var mongo = require("mongodb").MongoClient;
    // var url = "./mongodb://mrcodex-learnyoumongo-4310431:27017/learnyoumongo"
    var url = "mongodb://localhost:27017/learnyoumongo";
    mongo.connect(url, function(err, db) {
        if(err) {
            throw err;
        }
        var selector = {
            age: {
                $gt: +process.argv[2]
            }
        };
        var projection = {
            name: 1,
            age: 1,
            _id: 0
        };

        db.collection("parrots").find(selector, projection).toArray(function(err, documents) {
            if(err) {
                throw err;
            }
            console.log(documents);
            db.close();
        });
    });
}
// challenge4();

function challenge5() {
    var mongo = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017/learnyoumongo";
    
    mongo.connect(url, (err, db) => {
        if(err) {
            throw err;
        }
        var doc = {
            firstName: process.argv[2],
            lastName: process.argv[3]
        };
        db.collection("docs").insert(doc, (err, data) => {
            db.close();
            if(err) {
                throw err;
            }
            console.log(JSON.stringify(doc));
        });
    });
}
// challenge5();

function challenge6() {
    var mongo = require("mongodb").MongoClient
    var url = "mongodb://localhost:27017/" + process.argv[2]
    
    mongo.connect(url, (err, db) => {
        if(err) {
            db.close();
            throw err;
        }
        db.collection('users').update(
            {
                username: "tinatime"
            },
            {
                $set: {
                    age: 40
                }
            },
            (err, data) => {
                db.close();
                if (err) {
                    throw err;
                }
            }
        );
    });

}
// challenge6();

function challenge7() {
    var mongo = require("mongodb").MongoClient
    var database = process.argv[2];
    var collection = process.argv[3];
    var id = process.argv[4];
    var url = "mongodb://localhost:27017/" + database

    mongo.connect(url, (err, db) => {
        if(err) {
            db.close();
            throw err;
        }
        var query = {_id: id};
        db.collection(collection).remove(query, (err, data) => {
            db.close();
            if (err) {
                throw err;
            }
        });
    });

}
// challenge7();

function challenge8() {
    var mongo = require("mongodb").MongoClient

    var url = "mongodb://localhost:27017/learnyoumongo"

    mongo.connect(url, (err, db) => {
        if(err) {
            db.close();
            throw err;
        }
        var query = {
            age: {
                $gt: +process.argv[2]
            }
        }
        db.collection("parrots").count(query, (err, count) => {
            db.close();
            if (err) {
                throw err;
            }
            console.log(count);
        });
    });

}
// challenge8();
// collection.aggregate([
//       { $match: { status: 'A' }}
//     , { $group: {
//         _id: 'total' // This can be an arbitrary string in this case
//       , total: {
//           // $sum is the operator used here
//           $sum: '$value'
//         }
//       }}
//     ])
function challenge9() {
    var mongo = require("mongodb").MongoClient
    var url = "mongodb://localhost:27017/learnyoumongo"

    mongo.connect(url, (err, db) => {
        if(err) {
            db.close();
            throw err;
        }
        
        db.collection("prices").aggregate([
            {
                $match: {size: process.argv[2]}
            },
            {
                $group: {
                    _id: 'average',
                    average: {$avg: '$price'}
                }
            }
        ]).toArray((err, data) => {
            db.close();
            if (err) {
                throw err;
            }
            if (!data.length) {
                throw new Error('No results found')
            }
            console.log(data[0].average.toFixed(2));
        });
    });

}
challenge9();
