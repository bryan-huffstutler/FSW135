import React, { useContext, useState } from 'react'
import Comment from '../components/Comment'
import {UserContext} from '../context/UserProvider'
import CommentForm from '../components/CommentForm'

export default function Issue (props) {
  const [pComment, setPComment] = useState(false)
  const [displayComments, setDisplayComments] = useState(false)
  
  const {getCommentsForIssue, issueComments, getUserName, addLike, addDislike, getIssues} = useContext(UserContext)
  const { topic, _id, imgUrl, username, postDate, likes, dislikes } = props
  function togglePComment () {
    setPComment(prevState => !prevState)
  }

  function toggleDispComments () {
    setDisplayComments(prevState => !prevState)
    if(!displayComments){
      getCommentsForIssue(_id)
    }
  }

  function addALike (event) {
    addLike(event)
    getIssues()
  }

  function addADislike (event){
    addDislike(event)
    getIssues()
  }

  return (
    <div id={_id} key={_id}>

      <h1>{topic}</h1>

      <img src={imgUrl} width="350" height="300"/><br/>

      <span><strong>Posted By: </strong>{username}</span>
      <span> <strong>Post Date: </strong>{Date(postDate)}</span>
      <span> <strong>Likes:</strong> {likes} <strong>Dislikes:</strong> {dislikes}</span><br/>

      {displayComments && issueComments ?
      issueComments.map(comment => <Comment {...comment} key={comment._id} getUserName = {getUserName}/>) : 
      <button onClick={toggleDispComments}>View Comments</button>}

      {displayComments ? <button onClick={toggleDispComments}>HIDE COMMENTS</button> : ""}

      {pComment ? <CommentForm togglePComment = {togglePComment}/> : <button onClick={togglePComment}>Post a Comment</button>}
      {!displayComments ? <button onClick={addALike}>LIKE</button> : "" }
      {!displayComments ? <button onClick={addADislike}>DISLIKE</button> : ""}
      
      

    </div>
  )
}