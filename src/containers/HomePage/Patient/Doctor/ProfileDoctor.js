import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils/constant';
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl'
import { getProfileDoctorById } from '../../../../services/userService'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        const { doctorId } = this.props
        let doctorInfo = await this.getInfoDoctor(doctorId)
        if (doctorInfo)
            this.setState({ dataProfile: doctorInfo })
    }

    async componentDidUpdate(prevProps) {
        // const { doctorId } = this.props

        // if(prevProps.doctorId !== doctorId)
        //     let doctorInfo = this.getInfoDoctor(id)

    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)

            if (res && res.errCode === 0) {
                result = res.data
            }
        }

        return result
    }


    renderTimeBooking = (dataTime) => {
        const { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY") :
                moment.unix(+dataTime.date / 1000).locale('en').format("ddd - YYYY/MM/DD")
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>
                        <FormattedMessage id="modal-booking.free-booking" />
                    </div>
                </>
            )
        }

        return <></>
    }

    render() {
        const { dataProfile } = this.state
        const { language, isShowDoctorDescription, dataTime } = this.props

        let name = '', priceVi = '', priceEn = ''
        if (dataProfile) {
            if (language === LANGUAGES.VI)
                name = dataProfile.lastName + " " + dataProfile.firstName
            else
                name = dataProfile.firstName + " " + dataProfile.lastName
        }
        if (dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceData) {
            priceEn = dataProfile.Doctor_Info.priceData.valueEn
            priceVi = dataProfile.Doctor_Info.priceData.valueVi
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ""})` }}
                    />

                    <div className="content-right">
                        <div className="up">
                            {name}
                        </div>

                        <div className="down">
                            {
                                isShowDoctorDescription ?
                                    <>
                                        {
                                            (dataProfile.Markdown && dataProfile.Markdown.description) &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </> :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                            }
                        </div>
                    </div>
                </div>

                <div className="price">
                    Giá khám: {"  "}
                    <NumberFormat
                        value={language === LANGUAGES.VI ? priceVi : priceEn}
                        displayType='text'
                        thousandSeparator={true}
                        suffix={language === LANGUAGES.VI ? 'đ' : '$'}
                        style={{ color: "#333" }}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
