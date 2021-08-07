import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils/constant';
import './DoctorSchedule.scss'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../../services/userService'
import { toast } from 'react-toastify';
// import * as actions from '../../../../store/actions'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allDay: [],
            allAvailableTimes: []
        }
    }

    setArrayDate = () => {
        let arrDate = []
        for (let i = 0; i < 3; i++) {
            let obj = {}
            obj.labelVi = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
            obj.labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(obj)
        }

        this.setState({ allDay: arrDate })
    }

    async componentDidMount() {
        this.setArrayDate()
    }

    componentDidUpdate(prevProps) {
        const { language } = this.props
        if (prevProps.language !== language) {
            this.setArrayDate()
        }
    }


    handleChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value

            let res = await getScheduleDoctorByDate(doctorId, date)

            let allTime = []

            if (res && res.errCode === 0) {
                allTime = res.data
                this.setState({
                    allAvailableTimes: allTime
                })
            }
        }
    }

    onHandleChoose = (item) => {
        const { allSchedule } = this.state
        if (allSchedule && allSchedule.length > 0) {
            let copySchedule = allSchedule
            copySchedule = allSchedule.map(i => {
                if (i.id === item.id) {
                    i.isSelected = !item.isSelected
                }

                return i
            })

            this.setState({
                allSchedule: copySchedule
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const { allDay, allAvailableTimes } = this.state
        const { language } = this.props

        console.log("CHECK DATE", allAvailableTimes)

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={this.handleChangeSelect}>
                        {allDay && allDay.length > 0 && allDay.map((item, index) => {
                            return (
                                <option
                                    value={item.value}
                                    key={index}
                                >
                                    {language === LANGUAGES.VI ? item.labelVi : item.labelEn}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="all-available-time">
                    <div className="text-calendar">
                        <span className="">
                            <i className="fas fa-calendar-alt" />
                            Lịch khám
                        </span>
                    </div>

                    <div className="time-content">
                        {
                            allAvailableTimes && allAvailableTimes.length > 0 ? allAvailableTimes.map((value, index) => {
                                let valueVi = value && value.timeTypeData ? value.timeTypeData.valueVi : ''
                                let valueEn = value && value.timeTypeData ? value.timeTypeData.valueEn : ''

                                return (
                                    <button
                                        key={index}
                                        className={value.isSelected ? "btn btn-schedule active" : "btn btn-schedule"}
                                        onClick={() => this.onHandleChoose(value)}
                                    >
                                        {language === LANGUAGES.VI ? valueVi : valueEn}
                                    </button>
                                )
                            }) : (
                                <div>
                                    <FormattedMessage id="manage-schedule.schedule" />
                                </div>
                            )
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
