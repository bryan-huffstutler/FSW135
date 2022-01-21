import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import UserComments from './UserComments'

export default function Public () {
  const [togCom, setTogCom] = useState(false)
  const {user, addIssue, issues, issueComments,  getIssues} = useContext(UserContext)
  
  return (
    <div id='public'>
      <h1>Welcome @{user.username}</h1>
      <h3>Post an issue</h3>
      <IssueForm addIssue={ addIssue }/>
      <div className= "issues">
        <IssueList issues={issues} getIssues={getIssues} issueComments={issueComments}/>
      </div>

      

      
    </div>
  )
}