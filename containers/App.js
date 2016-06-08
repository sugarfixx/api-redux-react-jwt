import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchQuote, fetchSecretQuote } from '../actions/index'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
//import Quotes from '../components/Quotes'
import Jumbotron from '../components/Jumbotron'

class App extends Component {

    render() {
        const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote } = this.props
        return (
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
                <div className='container'>
                    <Jumbotron
                        onQuoteClick={() => dispatch(fetchQuote())}
                        onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
                        isAuthenticated={isAuthenticated}
                        quote={quote}
                        isSecretQuote={isSecretQuote}
                    />
                </div>
            </div>
        )
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

    const { quotes, auth } = state
    const { quote, authenticated } = quotes
    const { isAuthenticated, errorMessage } = auth

    return {
        quote,
        isSecretQuote: authenticated,
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App)
