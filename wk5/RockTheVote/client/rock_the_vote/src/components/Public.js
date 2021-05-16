import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import UserComments from './UserComments'

export default function Profile () {
  const [togCom, setTogCom] = useState(false)
  const {user, addIssue, issues, getCommentsForUser, issueComments, userComments, getIssues} = useContext(UserContext)
  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <h3>Post an issue</h3>
      <IssueForm addIssue={ addIssue }/>
      <div className= "issues">
        <IssueList issues={issues} getIssues={getIssues} issueComments={issueComments}/>
      </div>

      <h3 id="commentViewer">View all of your posted comments: <button onClick={getCommentsForUser}>View</button></h3>

      
    </div>
  )
}