import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';

import Slider from "react-slick";

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-sec" ><FormattedMessage id="banner.specialized-examination"/> </span>
                        <button className="btn-sec"><FormattedMessage id="banner.watch-more" /></button>
                    </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 1</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 2</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 3</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 4</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 5</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 6</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 7</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-img section-specialty"/>
                            <div>Cơ xương khớp 8</div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
