export const getContacts = store => store.contacts;

export const getFilteredContacts = ({ contacts }) => {
  const { contactsArr, filter } = contacts;

  if (!filter) {
    return contactsArr;
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  const filterlist = contactsArr.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(normalizedFilter);
  });
  return filterlist;
};
