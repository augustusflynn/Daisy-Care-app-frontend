import React, { Component } from 'react';
import "./ManageDoctor.scss"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import  { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
 
import Select from 'react-select'
import { getDetailInfoDoctor } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctos: [],
            hasOldData: false,
            action: CRUD_ACTIONS.CREATE
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
        const { 
            contentHTML, 
            contentMarkdown, 
            description, 
            selectedDoctor,
            action
        } = this.state

        console.log("check: ", selectedDoctor)
            
        this.props.saveInfoDoctorRedux({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
            action: action
        })
    }

    handleChangeSelect = async (selectedDoctor) => {

        this.setState({ selectedDoctor })

        let res = await getDetailInfoDoctor(selectedDoctor.value)
        if(res && res.errCode === 0 && res.data.Markdown) {
            let mardown = res.data.Markdown
            this.setState({
                contentHTML: mardown.contentHTML,
                contentMarkdown: mardown.contentMarkdown,
                description: mardown.description,
                hasOldData: true,
                action: CRUD_ACTIONS.EDIT
            })
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeTextDescription = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        const { 
            selectedDoctor,
            description,
            listDoctos,
            contentMarkdown,
            hasOldData
        } = this.state;
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
                            onChange={this.handleChangeSelect}
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
                        value={contentMarkdown}
                    />
                </div>
                {
                    hasOldData ? (
                        <button 
                            className="save-content-doctor"
                            onClick={this.handleSaveContentMarkdown}
                        >
                            <span>
                                Sửa thông tin
                            </span>
                        </button>
                    ) : (
                        <button 
                            className="create-content-doctor"
                            onClick={this.handleSaveContentMarkdown}
                        >
                            <span>
                                Lưu thông tin
                            </span>
                        </button>
                    )
                }
                
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
