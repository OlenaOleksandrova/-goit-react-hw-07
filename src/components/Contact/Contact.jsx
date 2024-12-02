import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css";
import { HiUser, HiPhone } from "react-icons/hi";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={s.listItem}>
      <div className={s.contactInfo}>
        <span className={s.contactName}>
          <HiUser /> {name}:
        </span>
        <span className={s.contactNumber}>
          <HiPhone /> {number}
        </span>
      </div>
      <button
        className={s.button}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
