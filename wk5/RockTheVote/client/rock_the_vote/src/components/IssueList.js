import React, {useContext, useEffect} from 'react'
import Issue from '../components/Issue'

export default function IssueList (props) {
  const { issues, issueComments, getIssues } = props
  useEffect(() => {
    getIssues()
  }, [])
  
  return (
    <div>
      {issues.map(issue => <Issue {...issue} issueComments={issueComments} key={issue._id}/> )}
    </div>
  )
}