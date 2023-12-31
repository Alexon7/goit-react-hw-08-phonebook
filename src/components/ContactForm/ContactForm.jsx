import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'number') {
      setNumber(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name,
      number,
    };

    const isAtList = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isAtList) {
      toast.warn('Already in list');
      return;
    }

    if (name.trim() === '') {
      toast.warn('Please enter a name');
      return;
    }

    dispatch(addContact(contact));
    event.target.reset();
    toast.info('New contact was added!');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          label="Name"
          type="text"
          name="name"
          margin="normal"
          fullWidth
          inputProps={{
            pattern: '^[А-Яа-яЁёa-zA-Zs]+$',
          }}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={inputChange}
        />
      </div>
      <div>
        <TextField
          required
          label="Phone number"
          type="tel"
          name="number"
          margin="normal"
          fullWidth
          inputProps={{
            pattern: '^[0-9]+$',
          }}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={inputChange}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        type="submit"
        fullWidth
        sx={{
          mt: '24px',
          mb: '24px',
        }}
      >
        Create
      </Button>
    </Box>
  );
};
