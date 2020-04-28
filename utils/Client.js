import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';

const httpLink = createHttpLink({
  uri: 'http://d4a9a992.ngrok.io/graphql',
});

const retrieveToken = async () => {
  const token = await AsyncStorage.getItem('sharkToken')
  return token
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = retrieveToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolvers: {}
});

