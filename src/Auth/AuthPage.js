import React, { Component } from 'react'
import AuthForm from './AuthForm.js'
import { signUpUser, loginUser } from '../utils/api-utils.js'
import { removeToken } from '../utils/local-storage-utils.js'
export default class AuthPage extends Component {
    state = {
        loginUsername: '',
        loginPassword: '',
        signUpUsername: '',
        signUpPassword: '',
        error: '',
    }
    componentDidMount = () => {
        if (this.props.token === "") this.setState({status: 'logged out'})
        else this.setState({status: 'logged in'})
    }
    handleLoginUsernameChange = (e) => {
        this.setState({loginUsername: e.target.value})
    }
    handleLoginPasswordChange = (e) => {
        this.setState({loginPassword: e.target.value})
    }
    handleSignUpUsernameChange = (e) => {
        this.setState({signUpUsername: e.target.value})
    }
    handleSignUpPasswordChange = (e) => {
        this.setState({signUpPassword: e.target.value})
    }
    handleLoginSubmit = async (e) => {
        e.preventDefault()
        let user = {email: this.state.loginUsername, password: this.state.loginPassword}
        let token = await loginUser(user)
        this.props.tokenHandler(token)
        this.props.history.push('/search')
    }
    handleSignUpSubmit = async (e) => {
        e.preventDefault()
        let user = {email: this.state.signUpUsername, password: this.state.signUpPassword}
        
        try {
            let token = await signUpUser(user)
            this.props.tokenHandler(token)
            this.props.history.push('/search')
        }
        catch(e) {
            this.setState({error: e.response.body.error})
        }
        
    }
    handleSignOut = () => {
        removeToken()
        this.setState({status: 'logged out'})
        window.location.reload()
    }

    render() {
        return (
            <div>
                {this.state.status === 'logged out' && <h3>Please log in</h3>}
                {this.state.error !== '' && <h3>{this.state.error}</h3>}
                <label> Login
                    <AuthForm kind='Login' handleUsernameChange={() => this.handleLoginUsernameChange} handlePasswordChange={() => this.handleLoginPasswordChange} handleSubmit={this.handleLoginSubmit} usernameValue = {this.state.loginUsername} passwordValue = {this.state.loginPassword}></AuthForm>
                </label>
                
                <label> Sign Up
                    <AuthForm kind='SignUp' handleUsernameChange={() => this.handleSignUpUsernameChange} handlePasswordChange={() => this.handleSignUpPasswordChange} handleSubmit={this.handleSignUpSubmit} usernameValue = {this.state.signUpUsername} passwordValue = {this.state.signUpPassword}></AuthForm>
                </label>

                <label>
                    <button onClick = {this.handleSignOut}>Sign out?</button>
                </label>
            </div>
        )
    }
}
