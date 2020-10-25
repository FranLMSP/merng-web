import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Icon, Confirm, Button, Popup } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({postId, commentId, callback}) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      if(!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })

        proxy.writeQuery({query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter(p => p.id !== postId)
          }
        })
      }

      if(callback) {
        callback()
      }

    },
    variables: {
      postId,
      commentId
    }
  })

  return (
    <>
      <Popup
        content={`Delete ${commentId ? 'comment' : 'post'}`}
        inverted
        trigger={
          <Button as="div" floated="right" color="red" onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" style={{ margin: 0 }}  />
          </Button>
        }
      />
      <Confirm
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
        open={confirmOpen}
      />
    </>
  )

}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId){
      id
      commentCount
      comments {
        id username createdAt body
      }
    }
  }
`

export default DeleteButton
