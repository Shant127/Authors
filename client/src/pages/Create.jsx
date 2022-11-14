import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Create = () => {
    const navigate = useNavigate()

    const [name,setName] = useState("")
    const [read, setRead] = useState(false)
    const [releaseDate, setReleaseDate] = useState("")

    const[errors,setErrors] = useState([]);
    const handleCheck =() => {
        setRead(!read)
    } 

    const createAuthors = (e) => {
        e.preventDefault()
        let body = {
            "name" : name,
            "read" : read,
            "releaseDate" : releaseDate,
        }
        axios.post("http://localhost:8000/api/authors", body)
            .then(res =>  {
                console.log(res.data)
                setName("")
                setRead(false)
                setReleaseDate("")
                navigate("/authors")
            })
            .catch(err =>{
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
            //.catch(errors => console.log(errors))
    }

    return (
        <fieldset>
            <legend>Create.jsx</legend>
            <form onSubmit={createAuthors}>
                <p>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    Read:
                    <input type="checkbox" checked={read} onChange={handleCheck}  />
                </p>
                <p>
                    ReleaseDate:
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}  />
                </p>
                <button onClick={createAuthors}>Create</button>
            </form>
            {
                errors.map((error) => <p> {error} </p> )
            }
        </fieldset>
    )
}

export default Create