import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    submit = () => {

    }

    render() {
        return (
            <div id="loginform">
          
            <h2 id="headerTitle">Login</h2>
            <div>
             <FormInput 
                //   value={username} 
                  description="Username" 
                  placeholder="Username" 
                //   onChange={(text)=>setUserName(text.target.value)}
                  type="text" 
              />
             <FormInput 
                //   value={password}
                  onChangeText
                  description="Password" 
                  placeholder="Password" 
                //   onChange={(text)=>setPassword(text.target.value)}
                  type="password"
              />
             <div id="button" class="row">
             {/* {err && <p style={{color: "red"}}>{err}</p>} */}
            <button 
                onClick={this.submit} 
                className="btnAAA"
            >Sign in</button>
            
          </div>
           </div>
              </div>
         )
    }
}


const FormInput = props => (
    <div class="row">
        <label>{props.description}</label>
        <input 
            value={props.value} 
            onChange={props.onChange} 
            placeholder={props.placeholder}
            type={props.type}
        />
    </div>  
    );

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};



const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
