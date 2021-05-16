import React from 'react'

export default function Comment (props) {
  return (
    <div>
      <h2>{props.comment}</h2>
      <h4>{props.username}</h4>
      <h4>{props.postDate}</h4>
      <h4>{props.likes}</h4>
      <h4>{props.dislikes}</h4>
    </div>
  )
}