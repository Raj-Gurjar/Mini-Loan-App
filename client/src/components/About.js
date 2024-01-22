import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const navigate = useNavigate();

    function backHandler()
    {
        navigate(-1);
    }
    return (
        <div>
            <h2>About</h2>
            <br />
            <button onClick={backHandler}>Go Back to Home</button>
        </div>
    )
}
