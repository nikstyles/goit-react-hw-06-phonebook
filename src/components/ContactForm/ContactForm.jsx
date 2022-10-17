import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { RiUserAddFill } from 'react-icons/ri';

import useLocalStorage from 'hooks/useLocalStorage';

export default function ContactForm({ addContact }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    addContact({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form__card} onSubmit={handleSubmit}>
      <div className={s.form__list}>
        <div className={s.form__item}>
          <label className={s.form__title} htmlFor={nameId}>
            Name
          </label>
          <input
            className={s.form__input}
            id={nameId}
            type="text"
            onChange={handleInputChange}
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>

        <div className={s.form__item}>
          <label className={s.form__title} htmlFor={numberId}>
            Number
          </label>
          <input
            className={s.form__input}
            id={numberId}
            type="tel"
            onChange={handleInputChange}
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
      </div>

      <button className={s.form__btn} type="submit">
        <RiUserAddFill />
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
