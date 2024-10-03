import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const AddContact = () => {
    const {actions} = useContext(Context);
    const [form, setForms] = useState({ name: " ", phone: " ", email: " ", address: " "})
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
        navigate("/contacts")
    }

    return (
        <div className="container"> 
                <h1>Add a new contact</h1>
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
                <button className="btn btn-primary" type="submit">Save</button>
                <Link to="/" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">or get back to contacts</Link>
            </form>
       </div>
    )
}

export {AddContact}