import React, { useEffect } from 'react';
import { client } from '../utils/Client';
import { useMutation, useApolloClient } from '@apollo/react-hooks';


const SignOut = props => {

    useEffect(() => {
      client.writeData({ data: { token: '' } })
  }, []);
  

  return (
    <>
    </>
  )

}

export default SignOut;