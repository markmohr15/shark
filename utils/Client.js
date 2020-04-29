import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://d4a9a992.ngrok.io/graphql',
});

const GET_TOKEN = gql`
  {
    token @client
  }
`;

const authLink = setContext((_, { headers }) => {
  const data = cache.readQuery({query: GET_TOKEN});
  console.log(data.token)
  return {
    headers: {
      authorization: data.token ? `Bearer ${data.token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  resolvers: {}
});

cache.writeData({
  data: {
    token: '',
  }
})

