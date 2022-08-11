const { Client } = require('pg');

const credentials = {
    user: "postgres",
    host: "localhost",
    password: "pass",
    database: "tbh",
    port: 5432,
};



async function clientQuery(query) {
    let  client = new Client(credentials);
    await client.connect();
    let  resp = await client.query(query);
    await client.end();
    return resp;
}


async function getFormForSession(sessionId){
    let query =
   `SELECT label, type, values
    FROM session_forms
    INNER JOIN forms on session_forms.form_id = forms.id
    INNER JOIN questions on questions.id = ANY (forms.questions)
    WHERE session_id = ${sessionId}`;

    let result = await clientQuery(query);
    return result.rows;
}


module.exports = {getFormForSession};
