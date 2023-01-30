import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";
import { FC } from 'react';
import Container from './components/Container';

const  App:FC = () => {
  // InMemoryCache is a cache that stores the result of the query in the memory
  // and returns the result from the cache if the query is called again.
  //por defecto tira de cache si queremos usar la ref tendremos que deciselo
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });


// const getRickMortyCharacter = client.query({
//   query: gql`
//     query getRickMortyCharacter($name: String) {
//       character(name: $name) {
//         name
//         image
//       }
//     }
//   `,
//   variables: {
//     name: 'rick'
//   }
// });

  return (
    <div className="App">
      <ApolloProvider client={client}>

        <Container />

      </ApolloProvider>

    </div>
  );
}



export default App;
