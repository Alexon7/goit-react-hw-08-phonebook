import { List, Item, Text, Button } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectExistingContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectExistingContacts);

  if (!contacts) return;

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          <Text>
            {name}: {number}{' '}
          </Text>
          <Button type="button" onClick={() => dispatch(deleteContact(id))}>
            delete
          </Button>
        </Item>
      ))}
    </List>
  );
};
