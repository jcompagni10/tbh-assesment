const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./db.sqlite3";

let db = new sqlite3.Database(DBSOURCE);

function execQuery(query) {
    return new Promise(function(resolve, reject) {
        db.all(query, (err, rows)  =>{
            if(err){
                console.log("ERROR: ", err.message);
            }
            else {
                resolve(rows);
            }
        });
    });
}

function run(statement){
        return new Promise(function(resolve, reject) {
            db.run(statement, (err, rows)  =>{
                if(err){
                    console.log("ERROR: ", err.message);
                }
                else {
                    resolve(rows);
                }
            });
        });
}


module.exports = {execQuery, run};
