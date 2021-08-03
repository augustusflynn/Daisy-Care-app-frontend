import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Slider from "react-slick";

class MeicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-sec"><FormattedMessage id="banner.outstanding-medical-facility" /></span>
                        <button className="btn-sec"><FormattedMessage id="banner.watch-more" /></button>
                    </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 1</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 2</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 3</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 4</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 5</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 6</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 7</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-medical-facility"/>
                            <div>Hệ thống Y tế Thu Cúc 8</div>
                        </div>
                        <div>
                        </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeicalFacility);
