import { RiDeleteBin2Fill, RiUser3Fill } from 'react-icons/ri';
import s from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem({ name, number, id, onDeleteContact }) {
  return (
    <>
      <li className={s.contacts__item}>
        <RiUser3Fill size={20} />
        {name} <span>{number}</span>
        <button
          className={s.contacts__btn}
          id={id}
          onClick={() => onDeleteContact(id)}
        >
          <RiDeleteBin2Fill size={20} />
        </button>
      </li>
    </>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // key: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
