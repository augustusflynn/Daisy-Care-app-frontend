import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { getDetailInfoDoctor } from '../../../services/userService'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment'


class ManageSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedDoctor: null,
            listDoctos: [],
            currentDate: '',
            allSchedule: []
        }
    }

    async componentDidMount() {
        await this.props.fetchALLDoctor()
        await this.props.fetchAllcodeSchedule()
    }

    componentDidUpdate(prevProps) {
        const { allDoctors, language, allScheduleTime } = this.props
        if (prevProps.allDoctors !== allDoctors) {
            let dataSelect = this.buildInputDataSelect(allDoctors)
            this.setState({
                listDoctos: dataSelect
            })
        }

        if (prevProps.language !== language) {
            let dataSelect = this.buildInputDataSelect(allDoctors)
            this.setState({
                listDoctos: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== allScheduleTime) {
            this.setState({
                allSchedule: allScheduleTime
            })
        }
    }

    handleChangeSelect = async (selectedDoctor) => {

        this.setState({ selectedDoctor })

        let res = await getDetailInfoDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data.Markdown) {
            let mardown = res.data.Markdown
            this.setState({
                contentHTML: mardown.contentHTML,
                contentMarkdown: mardown.contentMarkdown,
                description: mardown.description,
                hasOldData: true,
                action: CRUD_ACTIONS.EDIT
            })
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    buildInputDataSelect = (data) => {
        const { language } = this.props
        let result = [];

        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let obj = {}

                let labelVi = `${data[`${i}`].lastName} ${data[`${i}`].firstName}`
                let labelEn = `${data[`${i}`].firstName} ${data[`${i}`].lastName}`

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = data[`${i}`].id

                result.push(obj)
            }
        }
        return result;
    }

    handleChangeDayPicker = (date) => {
        this.setState({ currentDate: date[0] })

    }

    render() {
        const { selectedDoctor, listDoctos, currentDate, allSchedule } = this.state
        const { language } = this.props
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.select-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctos}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.select-day" />
                            </label>
                            <DatePicker
                                onChange={this.handleChangeDayPicker}
                                className="form-control"
                                value={currentDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 pick-hour-container">
                            {
                                allSchedule && allSchedule.length > 0 && allSchedule.map((value, index) => {
                                    let valueVi = value.valueVi
                                    let valueEn = value.valueEn
                                    return (
                                        <button
                                            key={index}
                                            className="btn btn-schedule"
                                        >
                                            {language === LANGUAGES.VI ? valueVi : valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <button className="btn btn-primary btn-save-schedule">
                            <FormattedMessage id="manage-schedule.button" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchALLDoctor: () => dispatch(actions.fetchALLDoctor()),
        fetchAllcodeSchedule: () => dispatch(actions.fetchAllcodeSchedule())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
