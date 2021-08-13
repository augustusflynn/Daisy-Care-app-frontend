import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import { getTopSpecialties } from '../../../services/userService'
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router'

class Specialty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getTopSpecialties(8)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {
        const { dataSpecialty } = this.state
        const { language } = this.props

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-sec" ><FormattedMessage id="banner.specialized-examination" /> </span>
                        <button className="btn-sec"><FormattedMessage id="banner.watch-more" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {
                                dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, i) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={i}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div
                                                className="bg-img section-specialty"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div
                                                style={{
                                                    paddingTop: "30px",
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    paddingLeft: "15px"
                                                }}
                                            >{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
