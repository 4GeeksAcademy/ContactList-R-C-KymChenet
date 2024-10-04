import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const AddContact = () => {
    const {actions} = useContext(Context);
    const ImageCard = "https://static.vecteezy.com/system/resources/previews/016/833/872/original/github-logo-git-hub-icon-on-white-background-free-vector.jpg";
    const [form, setForms] = useState({ name: " ", email: " ", phone: " ", address: " ", photo: ImageCard})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForms({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlerAddContact = (e) => {
        e.preventDefault()

        actions.addContact(form)
        .then(() => {
            navigate('/contacts'); 
        })
        .catch(error => {
            console.error("Error during adding contact:", error)
        })
    }

    return (
        <div className="container"> 
                <h1 className="d-flex justify-content-center">Add a new contact</h1>
          <form onSubmit={handlerAddContact}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"/>   
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email "/>   
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <input 
                    type="text" 
                    name="phone"
                    className="form-control" 
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone "/>   
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input 
                    type="text" 
                    name="address"
                    className="form-control" 
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter address "/>   
                </div>
                <div className="d-grid gap-2 col-12 mx-auto">
                <button className="btn btn-primary" type="submit">Save</button>
                </div>
                <Link to="/" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">or get back to contacts</Link>
            </form>
       </div>
    )
}

export {AddContact}