import React, { Component } from 'react';
import "./UserManage.scss"
import { connect } from 'react-redux';
import { getAllUser, createUserService, deleteUser, editUser } from '../../services/userService';
import ModalUser from './Modal'
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/index'
import { withRouter } from 'react-router'
// emitter xử  lí được cả thằng cha và thằng con
// là 1 cái của nodejs

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpenUserModal: false,
            isOpenEditModal: false,
            user: {}
        }
    }

    async componentDidMount() {
        const { user, doctorMenuPath, patientMenuPath } = this.props
        if (user && user.roleId === "R2")
            this.props.history.replace(doctorMenuPath)
        else if (user && user.roleId === "R3")
            this.props.history.replace(patientMenuPath)
        else await this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let res = await getAllUser("ALL")
        if (res && res.errCode === 0)
            this.setState({
                arrUser: res.users
            })
    }

    handleToggle = (name) => {
        let copyState = { ...this.state }
        copyState[name] = !copyState[name]
        this.setState({
            ...copyState
        })
    }

    createNewUser = async (data) => {
        try {
            let res = await createUserService(data)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                alert("Created a new user!")
                await this.getAllUserFromReact()
                this.setState({ isOpen: false })

                emitter.emit('EVENT_CLEAR_MODAL_DATA') //có thể truyền data ngay sau string event
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        if (window.confirm("Are you sure wanna to delete this user ?")) {
            try {
                let res = await deleteUser(user.id)
                if (res && res.errCode === 0) {
                    await this.getAllUserFromReact()
                } else {
                    alert(res.errMessage)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    doEditUser = (user) => {
        this.setState({
            user: user
        })
    }

    handleEditUser = async (user) => {
        try {
            let res = await editUser(user)
            if (res && res.errCode === 0) {
                this.setState({ isOpenEditModal: false })
                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { arrUser, isOpenUserModal, isOpenEditModal, user } = this.state
        return (
            <div className="bg px-3">
                <ModalUser
                    isOpen={isOpenUserModal}
                    toggle={() => this.handleToggle("isOpenUserModal")}
                    createNewUser={this.createNewUser}
                />
                {isOpenEditModal && (
                    <ModalEditUser
                        isOpen={isOpenEditModal}
                        toggle={() => this.handleToggle("isOpenEditModal")}
                        user={user}
                        editUser={this.handleEditUser}
                    />
                )}
                <div className="title text-center"> Manage users with Augustus Flynn</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleToggle("isOpenUserModal")}
                    >
                        <i className="fas fa-plus"></i>
                        Add a new user
                    </button>
                </div>
                <div className="users-table mt-3">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUser && arrUser.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => {
                                                this.handleToggle("isOpenEditModal")
                                                this.doEditUser(item)
                                            }}
                                        >
                                            <i className="fas fa-pencil-alt "></i>
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        doctorMenuPath: state.app.doctorMenuPath,
        patientMenuPath: state.app.patientMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManage));
