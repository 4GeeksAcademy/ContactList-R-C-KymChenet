import React, {useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contacts = () => { 
        const {store, actions} = useContext(Context);
        const[editContactId, setEditContactId] = useState(null)
        const[formValues, setFormValues] = useState({ name: "", email: "", phone: "", address: ""})

        useEffect(() => {
                actions.getAgenda()
        }, [])
    

    const handleEditClick = (contact) => {
        setEditContactId(contact.id)
         setFormValues({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
         })
    }
    const handleUpdate = (contactId) => {
        actions.updateContact(contactId, formValues)
            .then(() => {
                setEditContactId(null);
                setFormValues({ name: "", email: "", phone: "", address: "" });
            })
            .catch(error => {
                console.log("Error updating contact:", error);
            });
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormValues({
                ...formValues,
                [name]: value
        })
    } 
    

        return ( 
                <div className="container">
                        <h1 className="d-flex justify-content-end">
                           <Link to="/addContact" className="btn btn-success">Add new Contact</Link>
                        </h1>
                        <ul className="list-group">
                                {store.contacts.length === 0 ? (
                                        <li className="list-group-item">No contacts</li>
                                ) : (
                                  store.contacts.map(contact => ( 
                                        <li key={contact.id} className="list-group-item d-flex align-items-start justify-content-between">
                                         { editContactId === contact.id ? (
                                <div className="d-flex flex-column" style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        placeholder="name"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        placeholder="email"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formValues.phone}
                                        onChange={handleInputChange}
                                        placeholder="phone"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                        placeholder="address"
                                        className="form-control mb-2"
                                    />
                                    <button onClick={() => handleUpdate(contact.id)} className="btn btn-primary" type="submit">
                                        Save Contact
                                    </button>
                                    <Link to="/addContact" className="btn btn-success mt-3" type="submit">Contact list</Link>
                                </div>
                            ) : ( 
                              <div className="d-flex align-items-center" style={{ flex: '1' }}>
                                                    <img
                                                        src={contact.photo || "https://static.vecteezy.com/system/resources/previews/016/833/872/original/github-logo-git-hub-icon-on-white-background-free-vector.jpg"}
                                                        alt={`${contact.name}`}
                                                        style={{ 
                                                                        width: '50px', 
                                                                        height: '50px', 
                                                                        borderRadius: '50%', 
                                                                        marginRight: '10px',
                                                                        display: 'block' 
                                                        }} 
                                                    />
                                                <div className="d-flex flex-column" style={{ marginLeft: '5px' }}>
                                                     <h5> {contact.name}</h5> 

                                                     <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-envelope-fillRule" viewBox="0 0 16 16">
                                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                                                        </svg> { contact.email}</p>

                                                     <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-telephone-fillRule" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                                        </svg> { contact.phone} </p>

                                                     <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-geo-alt-fillRule" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                                        </svg> { contact.address} 
                                                     </p> 
                                                </div>
                                                </div>
                                       )}
                                                        <div className="d-flex align-items-center">
                                                        { editContactId !== contact.id && (
                                                        <i className="p-2" onClick={() => handleEditClick(contact)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-pencil-fillRule" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                                </svg>
                                                        </i>
                                                        )}



                                                        <i className="p-2" onClick={() => actions.deleteContact(contact.id)} style={{ marginTop: '-8px' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-trash-fillRule" viewBox="0 0 16 16">
                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                                        </svg>
                                                        </i>
                                                        </div>
                                               
                                        </li>      
                                         ) ))}
                         </ul>    
                </div>  
         )
}

export {Contacts}