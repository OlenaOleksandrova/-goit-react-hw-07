import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";
import { selectIsLoading } from "./redux/contactsSlice";
import { useSelector } from "react-redux";

const App = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <h2>Loading...</h2>}
      <ContactList />
    </div>
  );
};

export default App;