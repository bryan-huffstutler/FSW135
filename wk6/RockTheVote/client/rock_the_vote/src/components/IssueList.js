import React, {useEffect} from 'react'
import Issue from '../components/Issue'

export default function IssueList (props) {
  const { issues, getIssues, username } = props
  useEffect(() => {
    getIssues()
  }, [])
  
  return (
    <div>
      {issues.map(issue => <Issue username={username} {...issue}  key={issue._id}/> )}
    </div>
  )
}