import React, { useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import * as BackgroundFetch from 'expo-background-fetch';

const GET_TOKEN = gql`
  query token {
    token
  }
`;

const SignOut = props => {
  const client = useApolloClient();
  useEffect(() => {
    client.cache.reset()
    client.writeQuery({query: GET_TOKEN, data: {"token": ""}})
    BackgroundFetch.unregisterTaskAsync(FETCH_TRIGGERED)
  }, []);
  

  return (
    <>
    </>
  )

}

export default SignOut;