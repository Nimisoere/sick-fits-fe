import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!){
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword){
            id
            email
            name
        }
    }
`

class Reset extends Component {
    static propTypes = {
        resetToken: PropTypes.string.isRequired
    }
    state = {
        password: '',
        confirmPassword: ''
    }

    saveToState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { email, password, confirmPassword } = this.state;
        const {resetToken} = this.props;
        return (
            <Mutation refetchQueries={[{query: CURRENT_USER_QUERY}]} mutation={RESET_MUTATION} variables={{
                resetToken: resetToken,
                password,
                confirmPassword
            }}>
                {
                    (reset, { error, loading, called }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            const success = await reset();
                            this.setState({
                                password: '',
                                confirmPassword: ''
                            })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset Your Password</h2>
                                <Error error={error} />
                                <label htmlFor="password">
                                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={this.saveToState} />
                                </label>
                                <label htmlFor="confirmPassword">
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={confirmPassword} onChange={this.saveToState} />
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

export default Reset
