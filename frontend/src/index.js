import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Form from "./form"
import Submission from "./submission"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes> 
            <Route path="/" element={<App />} />
            <Route path="/form/:formID" element={<Form />}/>
            <Route path="/submission/:sessionID/:email" element={<Submission/>}/>
        </Routes>
    </BrowserRouter>
 );
