// client/src/App.js
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export const CREATE_RECORD = gql`
mutation CreateRecord($recordDto: RecordTypeDto!) {
  createRecord(recordDto: $recordDto) {
    name
  }
}
`;
function App() {
  const [name, setName] = useState("");
  const [createRecord] = useMutation(CREATE_RECORD);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createRecord({
        variables: {
          recordDto:{
            name:name
          }
        },
      }).then((data)=>{
        console.log(data,"data created")
      });
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };
  return (
    <>
      <ApolloProvider client={client}>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="sample"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
