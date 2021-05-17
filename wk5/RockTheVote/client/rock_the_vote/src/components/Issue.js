import React, {useContext, useState} from 'react'
import Comment from '../components/Comment'
import {UserContext} from '../context/UserProvider'
import CommentForm from '../components/CommentForm'
import CommentsForIssue from '../components/CommentsForIssue'

export default function Issue (props) {
  const [pComment, setPComment] = useState(false)

  const {getCommentsForIssue, issueComments} = useContext(UserContext)
  const { topic, _id } = props
  
  function togglePComment () {
    setPComment(prevState => !prevState)
  }
  return (
    <div id={_id}>

      <h1>{topic}</h1>

      {pComment ? <CommentForm togglePComment = {togglePComment}/> : <button onClick={togglePComment}>Post a Comment</button>}
      
      <button onClick={getCommentsForIssue}>Comments</button>

      {/* {issueComments.length > 0 ? 
      <CommentsForIssue /> : ""} */}

    </div>
  )
}