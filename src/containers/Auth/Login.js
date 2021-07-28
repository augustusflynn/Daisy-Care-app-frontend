import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            err: ''
        };
    }

    submit = async () => {
        const { username, password } = this.state
        this.setState({ err:"" })
        try {
            let data = await handleLogin(username, password)
            if( data && data.errCode !== 0){
                this.setState({ err: data.message })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch(err) {
            if(err.response)
            {
                if(err.response.data){
                    this.setState({ err: err.response.data.message })
                }
            }
        }
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        const { username, password, isShowPassword, err } = this.state

        return (
            <div className="login-bg">

                <div id="loginform">
            
            <h2 id="headerTitle">Login</h2>
            <div>
            <div className="row">
                <label>Username</label>
                <input 
                    value={username} 
                    onChange={(text)=>this.setState({username: text.target.value})}
                    placeholder="username"
                    type="text" 
                />
            </div>  

            <div className="row" style={{marginLeft: '12px'}}>
                <label>Password</label>
                <div>
                    <input 
                        value={password} 
                        onChange={(text)=>this.setState({password: text.target.value})}
                        placeholder="password"
                        type={isShowPassword ? "text" : "password"}
                    />
                    <span
                        onClick={this.handleShowPassword}
                    >
                        <i className={ isShowPassword ? "far fa-eye": "far fa-eye-slash"}></i>
                    </span>
                </div>
            </div>  

            {err && <p className="error">{err}</p>}
            <div id="button" className="row">
            <button 
                onClick={this.submit} 
                className="btnAAA"
            >Sign in</button>
            
            </div>
            </div>
                </div>
            </div>
         )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};



const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
