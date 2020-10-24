import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'

const Home = () => {
  const { loading, data } = useQuery(FETCH_POST_QUERY)
  const posts = data ? data.getPosts : []

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          posts && posts.map(post => (
            <Grid.Column key={post.id} style={{marginBottom: 20}}>
              <PostCard post={post}/>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )

}

const FETCH_POST_QUERY = gql`
{
  getPosts {
    id
    body
    username
    createdAt
    likeCount
    commentCount
    likes {
      username
    }
    comments {
      id
      username
      body
      createdAt
    }
  }
}
`

export default Home
