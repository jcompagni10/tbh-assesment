var {execQuery, run} = require('./db');


function questionValsToArray(question){
//NOTE: obviosuly eval isn't totally safe, I switched databases from postgres
// to SQLlite and opted to continue using array types

    return question.values = eval(question.values);
}

function orderQuestions(q1, q2){
    console.log(q1.ord);
    return ( q1.ord < q2.ord) ? -1 : 1;
}
async function getFormForSession(sessionID){
    let query = `SELECT label, type, question_id, ord,
questions."values", form_questions.question_id
    FROM session_forms
    INNER JOIN form_questions on session_forms.form_id = form_questions.form_id
    INNER JOIN questions on form_questions.question_id = questions.id
    WHERE session_id = ${sessionID}`;
    let result = await execQuery(query);

    result.map(questionValsToArray);
    result.sort(orderQuestions);

    return {sessionID: sessionID, form: result };
}


async function handleSubmission(data){
    console.log(data);
    // TODO: Add validation
    let {session_id, email} = data;
    delete data.email;
    delete data.sessionID;
    let answers = JSON.stringify(data);
    let statement = `INSERT INTO submissions (user_email, answers, session_id)
                     VALUES ('${email}', '${answers}', '${session_id}')`;
    run(statement);
}

async function retriveSubmission(sessionID, email){
    console.log(sessionID, email);
    let query = `SELECT *
                 FROM submissions
                 WHERE  user_email = '${email}' AND session_id = '${sessionID}' `;
    let result = await execQuery(query);
    return result[0];
}




module.exports = {getFormForSession, handleSubmission, retriveSubmission};
