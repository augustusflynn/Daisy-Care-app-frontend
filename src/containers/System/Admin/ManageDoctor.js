import React, { Component } from 'react';
import "./ManageDoctor.scss"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import  { LANGUAGES } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
 
import Select from 'react-select'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctos: []
        }
    }

    componentDidMount() {
        this.props.fetchALLDoctor()
    }

    componentDidUpdate(prevProps) {
        const { allDoctors, language } = this.props
        if(prevProps.allDoctors !== allDoctors) {
            let dataSelect = this.buildInputDataSelect(allDoctors)
            this.setState({
                listDoctos: dataSelect
            })
        }

        if(prevProps.language !== language) {
            let dataSelect = this.buildInputDataSelect(allDoctors)
            this.setState({
                listDoctos: dataSelect
            })
        }
    }

    buildInputDataSelect = (data) => {
        const { language } = this.props
        let result = [];

        if(data && data.length > 0) {
            for(let i = 0; i  < data.length; i++) {
                let obj = {}
                
                let labelVi = `${data[`${i}`].lastName} ${data[`${i}`].firstName}`
                let labelEn = `${data[`${i}`].firstName} ${data[`${i}`].lastName}`
                
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = data[`${i}`].id

                result.push(obj)
            }
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        const { contentHTML, contentMarkdown, description, selectedDoctor } = this.state
        console.log(this.state)
            
        this.props.saveInfoDoctorRedux({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value
        })
    }

    handleChange = selectedDoctor => {
        this.setState({ selectedDoctor });
    }

    handleOnChangeTextDescription = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        const { selectedDoctor, description, listDoctos } = this.state;
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
                            options={listDoctos}
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
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchALLDoctor: () => dispatch(actions.fetchALLDoctor()),
        saveInfoDoctorRedux: (data) => dispatch(actions.saveInfoDoctorRedux(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
