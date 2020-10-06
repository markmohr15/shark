import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';


const SignOut = props => {
  const client = useApolloClient();
  useEffect(() => {
    client.writeData({ data: { token: '' } })
  }, []);
  

  return (
    <>
    </>
  )

}

export default SignOut;