import React, { Component } from 'react'
import Downshift, {resetIdCounter} from "downshift";
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!){
        items(where: 
            {OR:[
                {title_contains: $searchTerm},
                {description_contains: $searchTerm}
                ]
            }){
                id
                image
                title
            }
    }
 `

function routeToItem(item){
    Router.push({
        pathname: '/item',
        query: {
            id: item.id
        }
    })
}

class AutoComplete extends Component {
    state = {
        items: [],
        loading: false
    }
    onChange = debounce(async (e, client) => {
        this.setState({ loading: true })
        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: e.target.value }
        });
        this.setState({
            items: res.data.items,
            loading: false
        })
    }, 350);

    render() {
        const { items, loading } = this.state;
        resetIdCounter();
        return (
            <SearchStyles>
                <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                        <div>
                            <ApolloConsumer>
                                {
                                    client => (
                                        <input {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Search for an item',
                                            id: 'search',
                                            className: loading ? 'loading' : '',
                                            onChange: e => {
                                                e.persist()
                                                this.onChange(e, client)
                                            }
                                        })} type="search" name="" id="" />
                                    )
                                }
                            </ApolloConsumer>
                            {isOpen && <DropDown>
                                {items.map((item, index) =>
                                    <DropDownItem
                                        {...getItemProps({ item })}
                                        highlighted={index === highlightedIndex}
                                        key={item.id}
                                    >
                                        <img src={item.image} width="50" alt={item.title} key={item.id} />
                                        {item.title}
                                    </DropDownItem>)}
                                    {
                                        !items.length && !loading && (
                                            <DropDownItem>
                                                Nothing found for {inputValue}
                                            </DropDownItem>
                                        )
                                    }
                            </DropDown>}
                        </div>
                    )}
                </Downshift>
            </SearchStyles>
        )
    }
}

export default AutoComplete
