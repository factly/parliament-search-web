import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import 'isomorphic-unfetch';

export const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql'
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});
