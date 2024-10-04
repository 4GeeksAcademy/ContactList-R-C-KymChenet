const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			agenda: "my_agenda",
			selectedContact: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getAgenda: () => {
				const {agenda} = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`)
				 .then(response => response.json())
				 .then(data => setStore({contacts: data.contacts} )) 
				},
				
				addContact: (contact) => {
				const {agenda, contacts} = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				}).then(response => {
					if (!response.ok) {
						throw new Error('Failed to add contact');
					}
					return response.json();
				})
				.then(data => {
					setStore({ contacts: [...contacts, data] });
				})
				.catch(error => console.error("Error adding contact:", error)); // Manejo de errores
			},
				
				updateContact: (contactId, updatedContact) => {

					const { agenda, contacts } = getStore();
					fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${contactId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedContact)
					})
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then(data => {
						const updatedContacts = contacts.map(contact =>
							contact.id === contactId ? { ...contact, ...data } : contact
						);
						setStore({ contacts: updatedContacts });
					})
					.catch(error => console.log("Error updating contact:", error));


				},
				deleteContact: (id) => {
					const {agenda, contacts} = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
				}).then(() => {
					const newContacts = contacts.filter((contact) => contact.id  !== id)
					setStore({contacts: newContacts})
				}).catch(e => {
					console.log(e);
					
				})
			},

			getContact: (id) => {
				const {agenda} = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`) 
				.then(response => response.json())
				.then(data => { 
					setStore({selectedContact: data}) 
				})
				.catch(e => {
					console.log("Error getting the contact", e);	
				})
			 },
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
