import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        const { isOpen, toggle } = this.props
        return (
            <Modal 
                isOpen={isOpen} 
                toggle={toggle} 
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader toggle={toggle}>Create user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"/>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"/>
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text"/>
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text"/>
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text"/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" className="px-3" onClick={toggle}>Save</Button>{' '}
                <Button color="secondary" className="px-3" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalUser