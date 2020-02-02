import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

export const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!){
        signup(email: $email, name: $name, password: $password){
            id
            email
            name
        }
    }
`

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    saveToState = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { name, email, password } = this.state;
        return (
            <Mutation refetchQueries={[{query: CURRENT_USER_QUERY}]} mutation={SIGNUP_MUTATION} variables={this.state}>
                {
                    (signup, { error, loading }) => (
                        <Form data-test="form" method="post" onSubmit={async e => {
                            e.preventDefault();
                            await signup();
                            this.setState({
                                name: '',
                                email: '',
                                password: ''
                            })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Up for an Account</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    <input type="email" name="email" id="email" placeholder="email" value={email} onChange={this.saveToState} />
                                </label>
                                <label htmlFor="name">
                                    <input type="text" name="name" id="name" placeholder="name" value={name} onChange={this.saveToState} />
                                </label>
                                <label htmlFor="password">
                                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={this.saveToState} />
                                </label>
                                <button type="submit">Sign Up</button>
                            </fieldset>
                        </Form>
                    )
                }

            </Mutation>
        )
    }
}

export default Signup
