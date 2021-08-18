import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils/constant';
import './AllClinic.scss'
import * as actions from '../../../../store/actions'
import { withRouter } from 'react-router'
import HomeHeader from '../../HomeHeader'
import HomeFooter from '../../HomeFooter'

class AllClinic extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    async componentDidMount() {
        const { allClinic } = this.props
        if (allClinic.length === 0) {
            this.props.fetchAllClinic()
        }
    }

    async componentDidUpdate(prevProps) {

    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {
        const { allClinic, language } = this.props
        return (
            <>
                <HomeHeader />
                <div style={{ marginTop: "60px" }} />
                <div className="all-specialty-container">
                    {
                        allClinic && allClinic.map((item, index) => {
                            let name = language === LANGUAGES.VI ? item.nameVi : item.nameEn
                            return (
                                <div
                                    className="all-specialty-content"
                                    key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div
                                        className="a-s-image"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                    <span className="a-s-title">
                                        {name}
                                    </span>
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
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinic())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllClinic));