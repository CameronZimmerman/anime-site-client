import React, { Component } from 'react'

export default class AuthForm extends Component {
    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <label> Email
                    <input value = {this.props.usernameValue} onChange = {this.props.handleUsernameChange()}/>
                </label>

                <label> Password
                    <input value = {this.props.passwordValue} onChange = {this.props.handlePasswordChange()}type='password'/>
                </label>
                <button>{this.props.kind}</button>
            </form>
        )
    }
}
