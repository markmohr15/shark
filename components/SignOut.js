import React, { useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';

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
  }, []);
  

  return (
    <>
    </>
  )

}

export default SignOut;