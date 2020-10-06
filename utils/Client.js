import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo3-cache-persist';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'https://sharksb-api.herokuapp.com/graphql',
  //uri: 'http://ace8f72c29d8.ngrok.io/graphql',
});

const authLink = setContext((_, { headers }) => {
  const data = cache.readQuery({query: GET_TOKEN});
  return {
    headers: {
      authorization: data.token ? `Bearer ${data.token}` : "",
    }
  }
});

const GET_TOKEN = gql`
  {
    token @client
  }
`;

export const createClient = async () => {
  await persistCache({
    cache,
    storage: AsyncStorage    
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    resolvers: {}
  })
}

cache.writeData({
  data: {
    token: '',
    sports: '',
  }
})


