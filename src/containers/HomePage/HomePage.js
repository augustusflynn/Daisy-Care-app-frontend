import React, { Component } from 'react'
import HomeHeader from './HomeHeader';
import { connect } from 'react-redux';

import './HomePage.scss'

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">

                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars btnIcon"/>
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div><b>Chuyên khoa</b></div>
                            <div className="subTitle">Tìm bác sĩ theo chuyên khoa</div>
                        </div>

                        <div className="child-content">
                            <div><b>Cơ sở y tế</b></div>
                            <div className="subTitle">Chọn bệnh viện phòng khám</div>
                        </div>

                        <div className="child-content">
                            <div><b>Bác sĩ</b></div>
                            <div className="subTitle">Chọn bác sĩ giỏi</div>
                        </div>

                        <div className="child-content">
                            <div><b>Gói khám</b></div>
                            <div className="subTitle">Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <i className="fas fa-question-circle"/>
                            Hỗ  trợ
                            <div className="flag">VN</div>
                        </div>
                    </div>
                </div>
            </div>

                <div className="home-header-banner">
                    <div className="title1">
                        NỀN TẢNG Y TẾ
                    </div>
                    <div className="title2">
                        CHĂM SÓC SỨC KHỎE TOÀN DIỆN
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
                            <div className="text-child">Khám <br/>Chuyên khoa</div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="ktx"></div>
                            </div>
                            <div className="text-child">Khám<br/>từ xa</div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="ktq"></div>
                            </div>
                            <div className="text-child">Khám<br/> tổng quát</div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="xnyh"></div>
                            </div>
                            <div className="text-child">Xét nghiệm <br/>y học</div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="sktt"></div>
                            </div>
                            <div className="text-child">Sức khỏe <br/>tinh thần</div>
                        </div>

                        <div className="options-child">
                            <div className="icon-child">
                                <div className="knk"></div>
                            </div>
                            <div className="text-child">Khám <br/>nha khoa</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
