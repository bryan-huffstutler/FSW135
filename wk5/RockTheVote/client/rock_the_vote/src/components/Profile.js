import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from '../components/IssueForm'
import IssueList from '../components/IssueList'
import UserComments from '../components/UserComments'

export default function Profile () {
  const {user, addIssue, issues, getCommentsForUser, userComments} = useContext(UserContext)
  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <h3>Post an issue</h3>
      <IssueForm addIssue={ addIssue }/>
      <div className= "issues">
        <IssueList issues={issues}/>
      </div>
      <h3 id="commentViewer">View all of your posted comments: <button onClick={getCommentsForUser}>View</button></h3>
      {userComments ? <UserComments /> : ""}
    </div>
  )
}