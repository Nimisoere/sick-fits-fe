import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

export const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id: ID!){
        addToCart(id: $id){
            id
            quantity
        }
    }
`

class AddToCart extends Component {
    render() {
        const { id } = this.props;
        const cartIcon = '\u{1F6D2}';
        return (
            <Mutation mutation={ADD_TO_CART_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]} variables={{id}}>
                {(addToCart, {loading}) => (
                    <button disabled={loading} onClick={addToCart}>Add{loading? 'ing' : ''} to Cart {cartIcon}</button>
                )}
            </Mutation>
        )
    }
}

export default AddToCart

