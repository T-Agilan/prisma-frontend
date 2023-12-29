import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";
import App from "./App";
import ReactDOM from 'react-dom';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3333/graphql', // Make sure this matches your server endpoint
  }),
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
