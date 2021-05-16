import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import Comment from './Comment'

export default function UserComments() {
  const { userComments } = useContext(UserContext)
  return (
    <div>
      {userComments.map(comment => <Comment {...comment} key={comment._id}/>)}
    </div>
  )
}