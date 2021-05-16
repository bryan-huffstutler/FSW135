import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

export const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})                              

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || "",
        issues: [],
        userComments: [],
        issueComments: []    
    }
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then (res => {
                //deconstructs the user and token from res.data
                const {user, token} = res.data
                //stores them into localstorage
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                //stores user, token into userState for use in Context
                setUserState( prevUserState => ({
                    ...prevUserState,
                    user, 
                    token
                }))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then (res => {
            //same as signup regarding user, token
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            //On login React redirects to profile page, function needed here to get issues
            getIssues();
            setUserState( prevUserState => ({
                ...prevUserState,
                user, 
                token
            }))
        })
            .catch (err => console.dir(err.response.data.errMsg))
    }

    function logout() {
        //clears user, token from local storage and resets Context
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({user: {}, token: "", issues: []})
    }

    function addIssue (newIssue) {
        userAxios.post('/api/issues', newIssue)
        .then(res => {      
            //after post, spreads in new issue into Context      
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err=> console.log(err.response.data.errMsg))
    }

    function getIssues() {
        userAxios.get("/api/issues")
        .then(res => {
            //assigns res.data to issues to populate context
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getCommentsForUser() {
        
        userAxios.get(`/api/comments/user/${userState.user._id}`) //grabs users id from user in context
        
        .then(res => {
            //Changes H3 to text if 304(Unchanged Status)
            if(res.status = 304){
                const h3 = document.getElementById("commentViewer")
                h3.innerHTML = "You have no comments at this time."
            }
            //adds res.data to userComments to be available in Context
            setUserState(prevState => ({
                ...prevState,
                userComments: res.data
            }))
        })
    }

    function getCommentsForIssue(e) {
        const btnPar = e.target.parentNode
        const id = btnPar.id
        userAxios.get(`/comments/issue/${id}`)
        .then(res => {
          setUserState(prevState => ({
            ...prevState,
            issueComments: [...prevState.issueComments, res.data]
          }))
        })
    }

    function postComment(newComment) {  
        userAxios.post(`/api/comments`, newComment)
        .then (res => console.log(`Added to DB`))
        .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addIssue, getCommentsForUser, getCommentsForIssue, postComment, getIssues} }>
            { props.children }
        </UserContext.Provider>
    )
}