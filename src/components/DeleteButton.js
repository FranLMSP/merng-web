import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Icon, Confirm, Button } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({postId, callback}) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })

      proxy.writeQuery({query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter(p => p.id !== postId)
        }
      })

      if(callback) {
        callback()
      }
    },
    variables: {
      postId
    }
  })

  return (
    <>
      <Button as="div" floated="right" color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: 0 }}  />
      </Button>
      <Confirm
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
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

export default DeleteButton
