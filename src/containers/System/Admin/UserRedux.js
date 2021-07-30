import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions'
import "./UserRedux.scss"

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImg: '',
            isOpen: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { genderRedux, roleRedux, positionRedux } = this.props
        if(prevProps.genderRedux !== genderRedux) {
            this.setState({
                genderArr: genderRedux
            })
        }
        if(prevProps.roleRedux !== roleRedux) {
            this.setState({
                roleArr: roleRedux
            })
        }
        if(prevProps.positionRedux !== positionRedux) {
            this.setState({
                positionArr: positionRedux
            })
        }
    }

    componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
        // try{
        //     let gender = await getAllCodeService("gender")
        //     let role = await getAllCodeService("role")
        //     let position = await getAllCodeService("position")
        //     if(
        //         gender && gender.errCode === 0 &&
        //         role && role.errCode === 0 &&
        //         position && position.errCode === 0 
        //     ) {
        //         this.setState({
        //             genderArr: gender.data,
        //             roleArr: role.data,
        //             positionArr: position.data
        //         })
        //     }
        // }catch(e) {
        //     console.log(e)
        // }
    }

    handleChangeImg = (files) => {
        if(files) {
            let file = files[0]
            let imgUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: imgUrl
            }) 
        }
    }

    render() {
        const { genderArr, roleArr, positionArr, previewImg, isOpen } = this.state
        const { language, isLoading } = this.props
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="manage-user.add"/>
                </div>
                <div className="mt-3"/>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isLoading && "Loading gender ..."}</div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className="form-control" type="email"/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type="password"/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control">
                                    {genderArr && genderArr.length > 0 && (
                                        genderArr.map((item, index) => (
                                            <option 
                                                key={index}
                                            >
                                                {
                                                    language === LANGUAGES.VI ? 
                                                        item.valueVi : 
                                                        item.valueEn
                                                }
                                            </option>
                                        ))
                                    )} 
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control">
                                    {roleArr && roleArr.length > 0 && (
                                        roleArr.map((item, index) => (
                                            <option 
                                                key={index}
                                            >
                                                {
                                                    language === LANGUAGES.VI ? 
                                                        item.valueVi : 
                                                        item.valueEn
                                                }
                                            </option>
                                        ))
                                    )} 
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control">
                                    {positionArr && positionArr.length > 0 && (
                                        positionArr.map((item, index) => (
                                            <option 
                                                key={index}
                                            >
                                                {
                                                    language === LANGUAGES.VI ? 
                                                        item.valueVi : 
                                                        item.valueEn
                                                }
                                            </option>
                                        ))
                                    )} 
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image"/>
                                </label>
                                <div className="preview-image-container">
                                    <input 
                                        type="file" 
                                        id="previewImg" hidden
                                        onChange={(e) => this.handleChangeImg(e.target.files)}
                                    />
                                    <label className="lable-upload" htmlFor="previewImg">
                                        <FormattedMessage id="manage-user.upload" />
                                        <i className="fas fa-upload  px-3" />
                                    </label>
                                    <div 
                                        className="preview-img" 
                                        style={{
                                            backgroundImage: `url(${previewImg})`
                                        }}
                                        onClick={previewImg && (() => this.setState({ isOpen: true }))}
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-user.save"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                    )}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
