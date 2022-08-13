import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';


function SubmissionTable(props){
    let data = props.data
    let style = {border: "1px solid"}
    if (data) {
        return (
            <table>
                <tbody>
                    {Object.entries(data).map(([k, v]) => {
                        return (
                            <tr key = {k}>
                                <td style = {style}> {k} </td>
                                <td style = {style}> {v} </td>
                            </tr>
                        )
                    })}
                </tbody>
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
    if (val){
    return(
        <main style={{ padding: "1rem 0" }}>
            <h3> Submission </h3>
            <h4> Raw Data </h4>
            <SubmissionTable data = {val.metadata}/>
            <h4> Pretty Answers </h4>
            <SubmissionTable data = {val.answers}/>
        </main>
    );}
}
