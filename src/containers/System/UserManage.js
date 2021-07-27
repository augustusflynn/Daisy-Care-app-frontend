import React, { Component } from 'react';
import "./UserManage.scss"
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser } from '../../services/userService';
import ModalUser from './Modal'

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpen: false
        }
    }

    async componentDidMount() {
        let res = await getAllUser("ALL")
        if(res && res.errCode === 0)
            this.setState({
                arrUser: res.users
            })
    }

    handleAddNewUser = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { arrUser, isOpen } = this.state
        return (
            <div className="container">
                <ModalUser 
                    isOpen={isOpen} 
                    toggle={this.handleAddNewUser}
                />
                <div className="title text-center"> Manage users with Augustus Flynn</div>
                <div className="mx-1">
                    <button 
                        className="btn btn-primary px-3"
                        onClick={this.handleAddNewUser}
                    >
                        <i className="fas fa-plus"></i>
                        Add a new user
                    </button>
                </div>
                <div className="users-table mt-3">
                        <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUser && arrUser.map(({email, firstName, lastName, address }, i) => (
                            <tr key={i}>
                                <td>{email}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{address}</td>
                                <td>
                                    <button className="btn-edit">
                                        <i className="fas fa-pencil-alt "></i>
                                    </button>
                                    <button className="btn-delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </table>
                </div>
                    
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
