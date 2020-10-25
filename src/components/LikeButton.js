import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Icon, Label, Button } from 'semantic-ui-react'

const LikeButton = ({user, post: {id, likeCount, likes}}) => {
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  })

  return (
    <Button as='div' labelPosition='right'>
      {user && <Button color='teal' basic={!liked} onClick={likePost}>
        <Icon name='heart' />
      </Button>}
      {!user && <Button as={Link} to="/login" color='teal' basic onClick={likePost}>
        <Icon name='heart' />
      </Button>}
      <Label basic color='teal' pointing='left'>
        { likeCount }
      </Label>
    </Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id username
      }
      likeCount
    }
  }
`

export default LikeButton
