import React, { Component, PropTypes } from 'react'

export default class QuotesPublic extends Component {

    render() {
        const { onQuoteClick, isAuthenticated, quote, isSecretQuote} = this.props
        const quoteItem  = this.props.quote.data
        return (
            <div>
                { !isAuthenticated && !quote &&

                    <h1>Quotes of the day <hr/>
                    <small>Click and get a quote login to get a secret quote</small> </h1>
                }
                <blockquote className="blockquote">
                    { quote && !isSecretQuote &&
                        <div>
                            <p>{quoteItem.quote}</p>
                            <small>{quoteItem.author}</small>
                        </div>
                    }
                </blockquote>
                <button onClick={onQuoteClick} className="btn btn-primary">
                    Get Quotes
                </button>
            </div>
        )
    }
}

QuotesPublic.propTypes = {
    onQuoteClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    quote: PropTypes.object,
 }
