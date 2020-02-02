import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

export const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage: String
        $price: Int!
    ){
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ){
            id
        }
    }
`

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
    }

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' && value ? parseFloat(value)  : value;
        this.setState({
            [name]: val
        })
    };

    uploadFile = async e => {
        const files = e.target.files;
        if (files && files.length) {
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'sickfits');
            const res = await fetch('https://api.cloudinary.com/v1_1/nimisoere/image/upload', {
                method: 'POST',
                body: data
            });
            const file = await res.json();
            this.setState({
                image: file.secure_url,
                largeImage: file.eager[0].secure_url
            })
        }

    }

    render() {
        const {title, description, image, price} = this.state;
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form data-test="form" onSubmit={async e => {
                        e.preventDefault();
                        const res = await createItem();
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading} >
                            <label htmlFor="file">
                                Title
                                <input type="text" name="title" id="title" placeholder="Title" value={title} onChange={this.handleChange} required />
                            </label>
                            <label htmlFor="title">
                                Image
                                <input type="file" name="file" id="file" placeholder="Upload an image" onChange={this.uploadFile} required />
                                {!!image && <img width="200" src={image} alt={title || 'Upload preview'} />}
                            </label>
                            <label htmlFor="price">
                                Price
                                <input type="number" name="price" id="price" placeholder="Price" value={price} onChange={this.handleChange} required />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea name="description" id="description" placeholder="Enter a description" value={description} onChange={this.handleChange} required />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default CreateItem;
