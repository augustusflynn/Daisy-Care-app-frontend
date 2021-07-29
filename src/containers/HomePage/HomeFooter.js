import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';


class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2021 Augustus Flynn.
                    More infomation, visit my facebook
                    <a 
                        rel="noreferrer" 
                        target="_blank" href="https://www.facebook.com/huytung.novers/"
                    >
                        &#8594; Click here &#8592;
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
