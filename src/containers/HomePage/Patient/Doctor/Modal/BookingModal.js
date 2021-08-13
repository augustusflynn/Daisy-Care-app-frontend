import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl'
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../../components/Input/DatePicker'
import * as actions from '../../../../../store/actions'
import { LANGUAGES } from '../../../../../utils';
import Select from 'react-select'
import { postBookingAppointment } from '../../../../../services/userService'
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: '',
            phoneNumber: '',
            email: "",
            address: "",
            reason: '',
            birthday: "",
            gender: "",
            selectedGender: "",
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGender()
    }

    async componentDidUpdate(prevProps) {
        const { genders, language, dataSchedule } = this.props
        if (prevProps.genders !== genders) {
            this.setState({
                listGender: this.buildDataGender(genders),
                timeType: dataSchedule.timeType
            })
        }

        if (language !== prevProps.language) {
            this.setState({
                listGender: this.buildDataGender(genders)
            })
        }
    }

    onChangeText = (e) => {
        const { value, name } = e.target
        let copyState = this.state
        copyState[name] = value
        this.setState({ ...copyState })
    }

    handleChangeDayPicker = (date) => {
        this.setState({ birthday: date[0] })
    }

    buildDataGender = (data) => {
        const { language } = this.props

        let result = []

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap


                result.push(obj)
            })
        }

        return result
    }

    handleChangeSelect = async (selectedGender) => {
        this.setState({ selectedGender })
    }

    validateInput = () => {
        const valid = [
            "firstName",
            "lastName",
            "phoneNumber",
            "email",
            "address",
            "reason",
            "birthday",
            "selectedGender",
            "timeType",
        ]

        for (let i = 0; i < valid.length; i++) {
            if (!this.state[valid[i]]) {
                toast.warn("You must fill in input " + valid[i])
                return false
            }
        }

        return true
    }

    handleSubmit = async () => {
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            reason,
            birthday,
            selectedGender,
            timeType
        } = this.state

        const { dataSchedule, language } = this.props

        if (!this.validateInput()) return

        let formattedDate = new Date(birthday).getTime()
        let timeString = this.buildTimeBooking(dataSchedule)
        let doctorName = this.buildDoctorName(dataSchedule)
        let res = await postBookingAppointment({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            reason: reason,
            date: formattedDate,
            doctorId: this.props.doctorId,
            gender: selectedGender.value,
            timeType: timeType,
            language: language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success(res.message)
            this.props.toggle()
        }
        else
            toast.error(res.errMessage)
    }

    buildTimeBooking = (dataTime) => {
        const { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY") :
                moment.unix(+dataTime.date / 1000).locale('en').format("ddd - YYYY/MM/DD")
            return `${time} - ${date}`
        }

        return ""
    }


    buildDoctorName = (dataName) => {
        const { language } = this.props
        if (dataName && !_.isEmpty(dataName)) {
            let name = language === LANGUAGES.VI ?
                `${dataName.doctorData.lastName} ${dataName.doctorData.firstName}` :
                `${dataName.doctorData.firstName} ${dataName.doctorData.lastName}`
            return name
        }
        return ''
    }

    render() {
        const { isOpen, toggle, dataSchedule, doctorId } = this.props
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            reason,
            birthday,
            listGender,
            selectedGender
        } = this.state

        return (
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                className="booking-modal-container"
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="modal-booking.booking" />
                        </span>

                        <span className="right" onClick={toggle}>
                            <i className="fas fa-times" />
                        </span>
                    </div>

                    <div className="booking-modal-body container">
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDoctorDescription={false}
                                dataTime={dataSchedule}
                                isShowLink={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.onChangeText}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.onChangeText}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    className="form-control"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={this.onChangeText}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={this.onChangeText}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    onChange={this.onChangeText}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <Select
                                    value={selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={listGender}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.birthday" />
                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDayPicker}
                                    className="form-control"
                                    value={birthday}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-user.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    name="reason"
                                    value={reason}
                                    onChange={this.onChangeText}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn-confirm" onClick={this.handleSubmit}>
                            <FormattedMessage id="modal-booking.submit" />
                        </button>

                        <button className="btn-cancel" onClick={toggle}>
                            <FormattedMessage id="modal-booking.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
