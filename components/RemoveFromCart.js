import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

export const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id: ID!){
        removeFromCart(id: $id){
            id
        }
    }
`

const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: none;
    &:hover {
        color: ${props => props.theme.red};
        cursor: pointer;
    }
`

class RemoveFromCart extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired
    }

    update = (cache, payload) => {
        const data = cache.readQuery({
            query: CURRENT_USER_QUERY
        })
        const cartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
        cache.writeQuery({query: CURRENT_USER_QUERY, data})
    }

    render() {
        const {id} = this.props;
        return (
            <Mutation optimisticResponse={{
                __typename: 'Mutation',
                removeFromCart: {
                    __typename: 'CartItem',
                    id
                }
            }} update={this.update} mutation={REMOVE_FROM_CART_MUTATION} variables={{id}}>
                {(removeFromCart, {loading, error}) => (
                    <BigButton disabled={loading} onClick={() => removeFromCart().catch(err => alert(err.message))} title="Delete Item">&times;</BigButton>
                )}
            </Mutation>
        )
    }
}

export default RemoveFromCart
