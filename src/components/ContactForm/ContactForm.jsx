import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addContact } from 'redux/operations';
import { Wrapper, Input, Label, Button } from './ContactForm.styled';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const inputChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'phone') {
      setPhone(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name,
      phone,
    };

    const isAtList = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isAtList) {
      alert('Already in list');
      return;
    }

    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    dispatch(addContact(contact));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          // pattern="^[a-zA-Z\s]+$"
          pattern="^[А-Яа-яЁёa-zA-Z\s]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={inputChange}
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor="number">Phone number</Label>
        <Input
          type="tel"
          name="number"
          // pattern="^[0-9]+$"
          pattern="\+?[0-9\s\-\(\)]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={inputChange}
        />
      </Wrapper>
      <Button type="submit"> Create </Button>
    </form>
  );
};
