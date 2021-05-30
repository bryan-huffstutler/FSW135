import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import UserComments from './UserComments'
import UserIssues from './UserIssues'

export default function Profile () {
  
  const [issueToggle, setIssueToggle] = useState(false)
  const [commentToggle, setCommentToggle] = useState(false)
  
  const { user, getCommentsForUser, userComments, getIssuesForUser, userIssues } = useContext(UserContext)

  function getComments() {
    setCommentToggle(prevState => !prevState)
    if(!commentToggle){
      getCommentsForUser()
    }
  }

  function getIssues() {
    setIssueToggle(prevState => !prevState)
    if(!issueToggle){
      getIssuesForUser()
    }
  }

  function togIssueTog() {
    setIssueToggle(prevState => !prevState)
  }

  function togCommentTog() {
    setCommentToggle(prevState => !prevState)
  }
  
  return (
    <div id='profile'>
      <h1>@<span style={{color: "red"}}>{user.username}</span>'s Profile</h1>

      <p>This is your personalized profile page, here you can view all of your posted comments or posted issues in one place!</p><hr/>
      
      {issueToggle ? <button onClick={togIssueTog}>HIDE ISSUES</button> : <button onClick={getIssues}>View Your Posted Issues</button>}
      {commentToggle ? <button onClick={togCommentTog}>HIDE COMMENTS</button> : <button onClick={getComments}>View Your Comments</button>}

      {commentToggle  ? <UserComments /> : ""}
      {issueToggle && userIssues ? <UserIssues /> : ""}     
    </div>
  )
}