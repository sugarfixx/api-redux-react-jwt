import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser } from '../actions'

export default class Navbar extends Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">PowerQuotes</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Test <span className="sr-only">(current)</span></a></li>
                        </ul>
                        <form className="navbar-form navbar-left" role="search">
                        {!isAuthenticated &&
                            <Login
                                errorMessage={errorMessage}
                                onLoginClick={ creds => dispatch(loginUser(creds)) }
                            />
                        }
                        {isAuthenticated &&
                            <Logout onLogoutClick={() => dispatch(logoutUser())} />
                        }
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
}

