import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker'

class ManagePatient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentDate: new Date()
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps) {

    }

    handleChangeDayPicker = (date) => {
        this.setState({ currentDate: date[0] })
    }

    render() {
        const { currentDate } = this.state
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">
                    <FormattedMessage id="manage-patient.manage" />
                </div>

                <div className='m-p-body row'>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-patient.select-date" />
                        </label>
                        <DatePicker
                            onChange={this.handleChangeDayPicker}
                            className="form-control"
                            value={currentDate}
                        />
                    </div>
                    <divc className="col-12 table-manage-patient">
                        <table style={{ width: "100%" }}>
                            <tr>
                                <th>Name</th>
                                <th colSpan="2">asdfsd</th>
                            </tr>
                            <tr>
                                <td>sdfsdfsdf</td>
                                <td>asdasdasd</td>
                                <td>asdasdasdasd</td>
                            </tr>
                        </table>
                    </divc>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
