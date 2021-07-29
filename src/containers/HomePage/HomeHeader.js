import React, { Component } from 'react'
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import logo from "../../assets/images/bookingcare-2020.svg"
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions' 

class HomeHeader extends Component {

    changeLanguage = (l) => {
        this.props.changeLanguageAppRedux(l)
    }

    render() {
        const { language } = this.props
        return (
            <React.Fragment>
                <div className="home-header-container">

                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars btnIcon"/>
                        <img className="header-logo" src={logo} alt="logo"/>
                    </div>

                    <div className="center-content">
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.specialty"/></b></div>
                            <div className="subTitle"><FormattedMessage id="homeheader.search-doctor"/></div>
                        </div>

                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                            <div className="subTitle"><FormattedMessage id="homeheader.select-room"/></div>
                        </div>

                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                            <div className="subTitle"><FormattedMessage id="homeheader.select-doctor"/></div>
                        </div>

                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                            <div className="subTitle"><FormattedMessage id="homeheader.check-health"/></div>
                        </div>
                    </div>
                    
                    <div className="right-content">
                        <div className="support">
                            <i className="fas fa-question-circle"/>
                            <FormattedMessage id="homeheader.support"/>
                            <div className={language === LANGUAGES.VI ? 'language-vi active': "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active': "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
            </div>

                <div className="home-header-banner">
                    <div className="bar">
                        <div className="title1">
                            <FormattedMessage id="banner.title1"/>
                        </div>
                        <div className="title2">
                            <FormattedMessage id="banner.title2"/>
                        </div>
                    </div>
                    <div className="search">
                            <i className="fas fa-search"/>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh"/>
                        </div>
                    <div className="others-media">
                        <div className="ios-app"></div>
                        <div className="android-app"></div>
                    </div>

                    <div className="options">
                        <div className="options-child">
                            <div className="icon-child">
                                <div className="hospital"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child1"/></div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="ktx"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child2"/></div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="ktq"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child3"/></div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="xnyh"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child4"/></div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="sktt"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child5"/></div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="knk"></div>
                            </div>
                            <div className="text-child text-center"><FormattedMessage id="banner.child6"/></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        
        )
    }
}



const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
