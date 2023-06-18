import { Input, Text } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { filterContacts } from 'redux/contacts/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Text>Find contact by name</Text>
      <Input
        type="text"
        onChange={e => {
          dispatch(filterContacts(e.target.value));
        }}
      />
    </>
  );
};
