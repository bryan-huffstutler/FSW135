import React, {useContext, useState} from 'react'
import Comment from '../components/Comment'
import {UserContext} from '../context/UserProvider'
import CommentForm from '../components/CommentForm'

export default function Issue (props) {
  const [pComment, setPComment] = useState(false)

  const {getCommentsForIssue} = useContext(UserContext)
  const { topic, _id, issueComments } = props
  
  function togglePComment () {
    setPComment(prevState => !prevState)
  }
  return (
    <div id={_id}>

      <h1>{topic}</h1>

      {pComment ? <CommentForm togglePComment = {togglePComment}/> : <button onClick={togglePComment}>Post a Comment</button>}
      
      <button onClick={getCommentsForIssue}>Comments</button>

      {issueComments ? 
      issueComments.map(comment => {
        <Comment {...comment} />
      }) : ""}

    </div>
  )
}