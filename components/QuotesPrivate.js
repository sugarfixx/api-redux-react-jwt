import React, { Component, PropTypes } from 'react'

export default class QuotesPrivate extends Component {

    render() {
        const { onSecretQuoteClick, isAuthenticated, quote, isSecretQuote} = this.props
        const quoteItem  = this.props.quote.data
        return (
            <div>
                { !quote && !isSecretQuote &&
                    <h1>Secret Quotes of the day <hr/>
                    <small>Click and get a quote login to get a secret quote</small> </h1>
                }
                <span className="label label-danger">Secret Quote</span>
                <blockquote className="blockquote">
                    { quote && isAuthenticated && isSecretQuote &&
                        <div>
                            <p>{quoteItem.quote}</p>
                            <small>{quoteItem.author}</small>
                        </div>
                    }
                </blockquote>
                { isAuthenticated &&
                    <button onClick={onSecretQuoteClick} className="btn btn-primary">
                        Get Secret Quotes
                    </button>
                }
            </div>
        )
    }
}

QuotesPrivate.propTypes = {
    onSecretQuoteClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    quote: PropTypes.object,
    isSecretQuote: PropTypes.bool.isRequired
 }
