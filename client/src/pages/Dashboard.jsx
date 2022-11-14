import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Dashboard = () => {
    //STATE
    const [allAuthors, setAllAuthors] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            // .then(res => console.log(res.data))
            .then(res => setAllAuthors(res.data))
            .catch(errors => console.log(errors))
    }, [refresh])

    const deleteAuthor = (author_id) => {
        axios.delete(`http://localhost:8000/api/authors/${author_id}`)
            .then(res => {
                setRefresh(!refresh)
            })
            .catch(errors => console.log(errors))
    }

    //HANDLER
    return (
    <fieldset>
        <legend>Dashboard.jsx</legend>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Read</th>
                    <th>Release Date</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    allAuthors.map((author) => {
                        //WE WILL DESTRUCTURE TO NOT HAVE TO REPEAT OUR ITEM SO MUCH IN THE TAGS AND CAN JUST CALL THE PROPERTIES DIRECTLY
                        const { _id, name, read, releaseDate, createdAt } = author
                        return (
                            <tr key={author._id}>
                                {/* DECONSTRUCTING OUR CONSTRUCTOR FROM OUR MODEL */}
                                <td>{_id}</td>
                                <td>{name}</td>
                                <td>{read}</td>
                                <td>{releaseDate}</td>
                                <td>{createdAt}</td>
                                <td>
                                    <Link to={`/authors/${_id}`}>View</Link>
                                    <Link to={`/authors/edit/${_id}`}>Edit</Link>
                                    <button onClick={() => deleteAuthor (_id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </fieldset>
    )
}
export default Dashboard