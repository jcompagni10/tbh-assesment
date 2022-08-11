const { Client } = require('pg');

const credentials = {
    user: "postgres",
    host: "localhost",
    password: "pass",
    port: 5432,
};



async function clientQuery(query) {
    let  client = new Client(credentials);
    await client.connect();
    let  res = await client.query(query);
    await client.end();

    return res;
}


const SCHEMA = `CREATE TABLE forms
 (id bigint,
  questions bigint[]);
CREATE TABLE questions
 (id bigint,
  type text,
  values text[])`;

function createSchema(){
    clientQuery(SCHEMA).then(console.log);
}


function resetDB (){
    return clientQuery("SELECT 'DROP TABLE IF EXISTS \"' || tablename || '\" CASCADE;'");
}


function setupDB(){
    resetDB().then(()=> createSchema());
}


setupDB();
