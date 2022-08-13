import React, { useEffect, useState } from "react";
import {useParams, Link } from 'react-router-dom';


function SubmissionTable(props){
    let data = props.data
    let style = {border: "1px solid"}
    if (data) {
        return (
            <table>
                {Object.entries(data).map(([k, v]) => {
                    return (
                        <tr>
                            <td style = {style}> {k} </td>
                            <td style = {style}> {v} </td>
                        </tr>
                    )
                })}
            </table>
        );
    }
}

export default function Submission() {
    const [val, setVal]= useState();
    let {sessionID, email} = useParams();

    const fetchSubmission = async () => {
        let submission= await fetch(`http://localhost:9000/submission/${sessionID}/${email}`)
            .then(resp=>resp.json());
        setVal(submission);
    };

    useEffect(()=> {
        fetchSubmission();
    }, []);
    return(
        <main style={{ padding: "1rem 0" }}>
            <h3> Submission </h3>
            <SubmissionTable data = {val}/>
            <SubmissionTable data = {JSON.parse(val.answers)}/>
        </main>
    );
}
