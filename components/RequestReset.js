import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`

class RequestReset extends Component {
    state = {
        email: '',
    }

    saveToState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { email } = this.state;
        return (
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
                {
                    (requestReset, { error, loading, called }) => (
                        <Form method="post" data-test="form" onSubmit={async e => {
                            e.preventDefault();
                            const success = await requestReset();
                            this.setState({
                                email: ''
                            })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Request a Password Reset</h2>
                                <Error error={error} />
                                {!error && !loading && called && <p>An email has been sent to you</p> }
                                <label htmlFor="email">
                                    <input type="email" name="email" id="email" placeholder="email" value={email} onChange={this.saveToState} />
                                </label>
                                <button type="submit">Request Reset</button>
                            </fieldset>
                        </Form>
                    )
                }

            </Mutation>
        )
    }
}

export default RequestReset
