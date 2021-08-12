import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import './ManageSpecialty.scss'
import { FormattedMessage } from 'react-intl'
//import markdonw
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
//

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contentHTML: "",
            contentMarkdown: ""
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    render() {
        const { contentMarkdown } = this.state

        return (
            <div className="manage-specialty-container">
                <div className="ms-title">

                </div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className="form-control" type="text" />
                    </div>

                    <div className="col-6">
                        <label>Ảnh chuyên khoa</label>
                        <input className="form-control-file" type="file" />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={contentMarkdown}
                        />
                    </div>

                    <div className="col-12">
                        <button>Save specialty</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
