import React from 'react';
import {useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

function RadioQuestion (props){
    let {label, values} = props.question;

    return (
            <div>
            <h3> {label} </h3>
            <RadioGroup>
            {values.map( value => {
                return <FormControlLabel key={value} value={value}
                                         control= {<Radio onChange= {() => props.onChange(value)} />} label={value} />}
                       )}
        </RadioGroup>
            </div>
    )

}

function TextQuestion (props){
    let {label} = props.question;

    return (
        <div>
            <h3> {label} </h3>
            <TextField id="outlined-basic" variant="outlined" onChange={(e)=>props.onChange(e.target.value)}
                       rows={4} multiline={true} sx = {{width: "500px"}}/>
        </div>
    )

}

function CheckboxQuestion (props){
    let {label, values} = props.question;
    let checkedAnswers = new Set();
    let onChange = function (checked, val){
        if (checked){
            checkedAnswers.add(val)
        } else{
            checkedAnswers.delete(val)
        }
        props.onChange(checkedAnswers)}

    return (
        <div>
            <h3> {label} </h3>
            <div>
                {values.map( value => {
                    return <FormControlLabel key={value}
                                             value={value}
                                             control={<Checkbox onChange= {(e, checked) => onChange(checked, value)} />} label={value} />
                }
                           )}
            </div>
        </div>
    )
}

function FormQuestionIndex({questions, responses, onChange}){

    return (
        <div>
            {questions.map((question, idx) => {
                switch(question.type){
                case "radio":
                    return <RadioQuestion key={question.question_id} question={question} onChange={onChange.bind(null, idx)}/>;

                case "text":
                    return <TextQuestion key={question.question_id} question={question} onChange={onChange.bind(null, idx)}/>;

                case "checkbox":
                    return <CheckboxQuestion key={question.question_id} question={question} onChange={onChange.bind(null, idx)}/>;
                }
            })}
            <TextField id="outlined-basic" label="Email" variant="outlined"
                       onChange={(e)=>onChange("email", e.target.value)}
                       sx = {{mt: "12px", width: "500px"}} />
        </div>
    );}

class FormWrapper extends React.Component {
    constructor(props) {
        super(props);
        let formID = props.formID;
        this.state = {formID, responses: {}, submitted: false};
    }

    onChange(idx, value) {
        let newResps = this.state.responses
        newResps[idx] = value
        this.setState({responses: newResps})}

    componentDidMount (){
        fetch("http://localhost:9000/form/"+this.state.formID )
            .then(resp=>resp.json()
                  .then(body=>
                      this.setState({form: body.form,
                                     sessionID: body.sessionID})));
    }

    validSubmission(){
        return (Object.keys(this.state.responses).length == this.state.form.length + 1)
            && Object.values(this.state.form).every((v)=>v !== null && v !== '')
    }

    submitForm(){
        let formData = {...this.state.responses, session_id: this.state.sessionID};
        let body = JSON.stringify(formData, (key, value) => value instanceof Set ? [...value] : value);
        fetch("http://localhost:9000/form/", {method: "POST",
                                              headers: {'Content-Type': 'application/json'},
                                              body: body
                                             })
        // TODO: validate successful submission and handle errors
            .then(()=>this.setState({submitted: true}))
    }

    render (){
        if (this.state.submitted){
            return (<div>
                        <h3> You form has been succesfully submitted!</h3>
                        <Link to ={`/submission/${this.state.sessionID}/${this.state.responses.email}`}> View Sumbission </Link>
                    </div>)
        } else if(this.state.form) {
            return (<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <h2> Post-Session Form </h2>
                        <FormQuestionIndex questions={this.state.form} responses={this.state.responses} onChange={this.onChange.bind(this)}/>

                        <Button variant="contained" sx={{width: "200px", mt: "20px"}}
                                disabled={!this.validSubmission()} onClick={this.submitForm.bind(this)}>Submit</Button>
                    </div>);
        }
        else{
            return <h3> Loading Form ... </h3>;
        }

    }
}


export default function Form() {
    let {formID} = useParams();
    return(
        <main style={{ padding: "1rem 0" }}>
            <FormWrapper formID={formID}/>
        </main>
    );
}
