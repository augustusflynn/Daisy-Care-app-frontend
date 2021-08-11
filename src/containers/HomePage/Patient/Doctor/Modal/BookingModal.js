import React, { Component } from 'react';
import { connect } from "react-redux";
// import { LANGUAGES } from '../../../../../utils/constant';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl'
import ProfileDoctor from '../ProfileDoctor';

class BookingModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps) {

    }


    render() {
        const { isOpen, toggle, dataSchedule, doctorId } = this.props

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

                        <span className="right">
                            <i className="fas fa-times" />
                        </span>
                    </div>

                    <div className="booking-modal-body container">
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDoctorDescription={false}
                                dataTime={dataSchedule}
                            />
                        </div>

                        <div className='row'>
                            <div className="col-6 form-group">
                                <label>Họ tên</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Địa chỉ email</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Lý do khám</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Đặt cho ai</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label>Giới tính</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn-confirm">
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
