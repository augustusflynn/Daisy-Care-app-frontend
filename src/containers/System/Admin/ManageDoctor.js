import React, { Component } from 'react';
import "./ManageDoctor.scss"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
 
import Select from 'react-select'

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: ''
        }
    }

    componentDidMount() {
    
    }

    componentDidUpdate(prevProps) {
    
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        console.log(this.state)
    }

    handleChange = selectedDoctor => {
        this.setState({ selectedDoctor });
        console.log(`Option selected:`, selectedDoctor);
    }

    handleOnChangeTextDescription = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        const { selectedDoctor, description } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className="more-info">

                    <div className="content-left form-group">
                        <label className="">Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
               
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea 
                            rows={4} 
                            className="form-control"
                            onChange={this.handleOnChangeTextDescription}
                            value={description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                    />
                </div>
                <button 
                    className="save-content-doctor"
                    onClick={this.handleSaveContentMarkdown}
                >
                    Lưu thông tin
                </button>
            </div>          
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
