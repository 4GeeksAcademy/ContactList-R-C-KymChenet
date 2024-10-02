import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contacts = () => { 
        const {store, actions} = useContext(Context);

        useEffect(() => {
                actions.getAgenda()
        }, [])

        return ( 
                <div className="container">
                        <h1>Contact List</h1>
                        <Link to="/addContact" className="btn btn-success">Add new Contact</Link> 
                        <ul className="list-group">
                                {store.contacts.length === 0 ? (
                                        <li className="list-group-item">No contacts</li>
                                ) : (
                                  store.contacts.map(contact => {
                                        <li key={contact.id} className="list-group-item d-flex justify-center" >
                                                <div>
                                                     <h5>{contact.name}</h5> 
                                                     <p>{contact.email}</p> 
                                                     <p>{contact.phone}</p>
                                                     <p>{contact.address}</p>
                                                </div>
                                                <button onClick={() => actions.deleteContact(contact.id)}
                                                        className="btn btn-danger">Delete Contact
                                                </button>
                                        </li>      
                                         } ))}
                         </ul>    
                </div>  
         )
}

export {Contacts}