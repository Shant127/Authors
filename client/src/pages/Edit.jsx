import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'



const Edit = () => {

    // GET PATH VARIABLE
    const { author_id } = useParams()
    const navigate = useNavigate()

    // STATE
    const [name, setName] = useState("")
    const [read, setRead] = useState("")
    const [releaseDate, setReleaseDate] = useState("")

    const [errors, setErrors] = useState([]); 
    const handleCheck =() => {
        setRead(!read)
    } 

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${author_id}`)
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setRead(res.data.read)
                setReleaseDate(res.data.releasedate)
            })
            .catch(errors => console.log(errors))
    }, [])

    const gotoDashboard = (e) => {
        navigate('/authors')
    }

    const updateAuthor = (e) => {
        e.preventDefault()
        // CREATE BODY TO SENT OVER TO API
        let updatedBody = {
            "name": name,
            "read": read,
            "releaseDate": releaseDate
        }
        // MAKE A AXIOS REQUEST TO MY API
        axios.put(`http://localhost:8000/api/authors/${author_id}`, updatedBody)
            .then(res => {
                // navigate(`/authors`) REDIRECT TO DASH
                navigate('/authors') // REDIRECT TO DETAILS
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <fieldset>
            <legend>Edit.jsx</legend>
            <form onSubmit={updateAuthor}>
                <p>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    Read Made:
                    <input type="checkbox" checked={read} onChange={handleCheck}  />
                </p>
                <p>
                ReleaseDate:
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </p>
                <button onClick={updateAuthor}>Submit</button>
                <button onClick={gotoDashboard}>Cancel</button>
            </form>
            {
                errors.map((error) => <p>{error}</p>)
            }
        </fieldset>
    )
}

export default Edit