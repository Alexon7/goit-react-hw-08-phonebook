// import { useState, useEffect } from 'react';

import { GlobalStyleComponent } from '../../styles/GlobalStyles';

// import { nanoid } from 'nanoid';

import { ContactForm } from '../ContactForm/ContactForm';

import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { MainTitle, Title, Container } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <MainTitle>Phonebook 📱</MainTitle>
      <ContactForm />
      <Title>Contacts 📑</Title>
      <Filter />
      {(isLoading && !error && (
        <>
          <br />
          <b>Waiting...</b>
        </>
      )) || <ContactList />}
      <GlobalStyleComponent />
    </Container>
  );
};
