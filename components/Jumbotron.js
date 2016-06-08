import React, { Component, PropTypes } from 'react'
import QuotesPrivate from './QuotesPrivate'
import QuotesPublic from './QuotesPublic'

export default class Jumbotron extends Component {

    render() {
        const { onQuoteClick, onSecretQuoteClick, isAuthenticated, quote, isSecretQuote } = this.props
        return (
            <div className="jumbotron">
                {!isAuthenticated &&
                    <QuotesPublic
                        isAuthenticated={isAuthenticated}
                        isSecretQuote={isSecretQuote}
                        quote={quote}
                        onQuoteClick={onQuoteClick}
                    />
                }
                {isAuthenticated &&
                    <QuotesPrivate
                        isAuthenticated={isAuthenticated}
                        onSecretQuoteClick={onSecretQuoteClick}
                        isSecretQuote={isSecretQuote}
                        quote={quote}
                    />
                }
            </div>
        )
    }
}

Jumbotron.propTypes = {
    onQuoteClick: PropTypes.func.isRequired,
    onSecretQuoteClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    quote: PropTypes.object,
    isSecretQuote: PropTypes.bool.isRequired
 }
