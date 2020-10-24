import React from 'react'
import App from './App'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)
