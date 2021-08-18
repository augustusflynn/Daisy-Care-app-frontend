import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils/constant';
import './AllDoctor.scss'
import * as actions from '../../../../store/actions'
import { withRouter } from 'react-router'
import HomeHeader from '../../HomeHeader'
import HomeFooter from '../../HomeFooter'

class AllDoctor extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    async componentDidMount() {
        const { allDoctorsDetail } = this.props
        if (allDoctorsDetail.length === 0) {
            this.props.fetchAllDetailDoctor()
        }
    }

    async componentDidUpdate(prevProps) {

    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-doctor/${item.id}`)
    }

    render() {
        const { allDoctorsDetail, language } = this.props
        return (
            <>
                <HomeHeader />
                <div style={{ marginTop: "100px" }} />
                <div className="all-specialty-container">
                    {
                        allDoctorsDetail && allDoctorsDetail.map((item, index) => {
                            let name = language === LANGUAGES.VI ?
                                `${item.lastName} ${item.firstName}` :
                                `${item.firstName} ${item.lastName}`
                            let imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                            let position = language === LANGUAGES.VI ?
                                `${item.positionData.valueVi}` :
                                `${item.positionData.valueEn}`
                            return (
                                <div
                                    className="all-specialty-content"
                                    key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div
                                        className="content-left"
                                        style={{ backgroundImage: `url(${imgBase64})` }}
                                    />

                                    <div className='content-right'>
                                        <span className="a-s-title">
                                            {position} | {name}
                                        </span>
                                        <span className="a-s-subTitle">
                                            <i className="fas fa-map-marker-alt" />
                                            <span>
                                                {item.address}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsDetail: state.admin.allDoctorsDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDetailDoctor: () => dispatch(actions.fetchAllDetailDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));