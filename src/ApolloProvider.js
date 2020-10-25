import React from 'react'
import App from './App'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const setAuthorizationLink = setContext((request, previousContext) => {
  const token = localStorage.getItem('jwt')
  return {
    headers: {
      authorization: token ? `Bearer ${ token }` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const client = new ApolloClient({
  link: setAuthorizationLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)
