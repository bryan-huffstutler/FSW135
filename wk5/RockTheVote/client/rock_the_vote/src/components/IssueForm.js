import React, { useState } from 'react'


const initInputs = {
  topic: ""
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addIssue } = props
  
  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addIssue(inputs)
    setInputs(initInputs)
  }

  const { topic } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="topic" 
        value={topic} 
        onChange={handleChange} 
        placeholder="Topic"/>
      
      <button>Add Issue</button>
    </form>
  )
}