import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  console.log(contacts);
  return (
    <>
      <ul className={s.contacts__list}>
        {contacts?.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
