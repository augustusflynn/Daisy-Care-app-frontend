import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';


class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về `APP NAME`
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe 
                            width="100%" 
                            height="400px" 
                            src="https://www.youtube.com/embed/Ws-QlpSltr8" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; 
                            clipboard-write; 
                            encrypted-media; 
                            gyroscope; 
                            picture-in-picture" 
                            allowfullscreen
                        ></iframe>
                    </div>
                    
                    <div className="content-right">
                        <p>July 29 2021 17:15 .....</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
