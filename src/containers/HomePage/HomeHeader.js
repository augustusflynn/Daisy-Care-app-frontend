import React, { Component } from 'react'
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import logo from "../../assets/images/logo.png"
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions'

class HomeHeader extends Component {

    changeLanguage = (l) => {
        this.props.changeLanguageAppRedux(l)
    }

    returnToHomePage = () => {
        if (this.props.history)
            this.props.history.push(`/home`)
    }

    handleClickDoctorPage = () => {
        this.props.history.push(`/login`)
    }

    render() {
        const { language, isShowBanner } = this.props
        return (
            <React.Fragment>
                <div className="home-header-container">

                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars btnIcon" />
                            <img
                                className="header-logo"
                                src={logo}
                                alt="logo"
                                onClick={this.returnToHomePage}
                            />
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className="subTitle"><FormattedMessage id="homeheader.search-doctor" /></div>
                            </div>

                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="subTitle"><FormattedMessage id="homeheader.select-room" /></div>
                            </div>

                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="subTitle"><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>

                            <div className="child-content" onClick={this.handleClickDoctorPage}>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="subTitle"><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle" />
                                <FormattedMessage id="homeheader.support" />
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "60px" }} />
                {isShowBanner &&
                    <div className="home-header-banner">
                        <div className="bar">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                        </div>
                        <div className="search">
                            <i className="fas fa-search" />
                            <input type="text" placeholder={language === LANGUAGES.VI ? "Tìm chuyên khoa khám bệnh" : "Find a medical specialty"} />
                        </div>
                        <div className="others-media">
                            <div className="ios-app"></div>
                            <div className="android-app"></div>
                        </div>

                        <div className="options">
                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-hospital hospital fa-2x" />
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child1" /></div>
                            </div>

                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt ktx fa-2x"></i>
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child2" /></div>
                            </div>

                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-notes-medical fa-2x ktq"></i>
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child3" /></div>
                            </div>

                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-stethoscope fa-2x xnyh" />
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child4" /></div>
                            </div>

                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-hand-holding-heart sktt fa-2x"></i>
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child5" /></div>
                            </div>

                            <div className="options-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical fa-2x knk"></i>
                                </div>
                                <div className="text-child text-center"><FormattedMessage id="banner.child6" /></div>
                            </div>
                        </div>
                    </div>

                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
