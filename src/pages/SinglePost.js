import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import moment from 'moment'
import { Grid, Card, Icon, Label, Image, Button } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'

const SinglePost = (props) => {
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })

  let PostMarkup

  if(!data) {
    PostMarkup = <p>Loading post...</p>
  } else {
    const { getPost } = data
    const { likes, id, body, createdAt, username, likeCount, commentCount } = getPost

    PostMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{ username }</Card.Header>
                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                <Card.Description>{ body }</Card.Description>
              </Card.Content>

              <hr/>

              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('Comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left" >
                    {commentCount}
                  </Label>
                </Button>

              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return PostMarkup
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id body createdAt username likeCount commentCount
      likes {
        username
      }
      comments {
        id username createdAt body
      }
    }
  }

`

export default SinglePost
