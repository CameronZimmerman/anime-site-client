import React, { Component } from 'react'
import AuthForm from './AuthForm.js'
import { setToken } from '../utils/local-storage-utils.js'
export default class AuthPage extends Component {
    state = {
        username: '',
        password: ''
    }
    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }
    handleSubmit = (e) => {
        // api stuff here
    }
    render() {
        return (
            <div>
                <AuthForm kind='Login' handler={this.handleUsernameChange}></AuthForm>
                <AuthForm kind='Sign Up' handler={this.handlePasswordChange}></AuthForm>
            </div>
        )
    }
}
