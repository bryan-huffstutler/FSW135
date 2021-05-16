import React from 'react'

export default function Issue (props) {
  const { topic, _id } = props
  return (
    <div id={_id}>
      <h1>{topic}</h1>
      <button>Comments</button>
    </div>
  )
}