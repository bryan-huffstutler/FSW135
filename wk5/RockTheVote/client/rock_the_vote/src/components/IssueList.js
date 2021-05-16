import React, {useContext} from 'react'
import Issue from '../components/Issue'

export default function IssueList (props) {
  
  const { issues } = props
  return (
    <div>
      {issues.map(issue => <Issue {...issue} key={issue._id}/> )}
    </div>
  )
}