import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import s from './App.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    // повертаються всі контакти що не дорівнюють "Id",
    // тобто того що ми хочемо видалити
  };

  const formSubmitHandler = contact => {
    const { name } = contact;
    const checkAddName = contacts.some(el => el.name === name);
    const newContact = {
      id: nanoid(),
      ...contact,
    };

    if (checkAddName) {
      return toast.error(`${name} is already in contacts.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setContacts(prev => {
      return [...prev, newContact];
      // в contacts записується новий масив в який розпилюється
      // попереднє значення та додається новий контакт (data)
    });
  };

  const handleChange = event => {
    setFilter(event.currentTarget.value);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // useEffect(() => { }, []);

  function filterContacts() {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filterlist = contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(normalizedFilter);
    });
    return filterlist;
  }

  return (
    <div className={s.phonebook}>
      <div className={s.phonebook__card}>
        <h1 className={s.phonebook__title}>Phonebook</h1>
        <ContactForm addContact={formSubmitHandler} />

        <h2 className={s.phonebook__second_title}>Contacts</h2>
        <Filter input={filter} onChange={handleChange} />
        {contacts.length === 0 ? (
          <p className={s.empty__text}>Phone book is empty</p>
        ) : (
          <ContactList
            contacts={filterContacts()}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
