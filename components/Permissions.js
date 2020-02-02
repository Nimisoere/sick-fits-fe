import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Error from './ErrorMessage';
import Table from './styles/Table'
import SickButton from './styles/SickButton';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
]

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($userId: ID!, $permissions: [Permission]){
        updatePermissions(permissions: $permissions, userId: $userId){
            id
            permissions
            name
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`

const Permissions = () => {
    return (
        <Query query={ALL_USERS_QUERY}>
            {
                ({ data, loading, error }) => (
                    <>
                        <Error error={error} />
                        <div>
                            <h2>Manage Permissions</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        {possiblePermissions.map((permission, index) => <th key={index}>{permission}</th>)}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.map(user => <UserPermissions key={user.id} user={user} />)}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )
            }
        </Query>
    )
}

import React, { Component } from 'react'

class UserPermissions extends Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array
        }).isRequired
    }

    state = {
        permissions: this.props.user.permissions
    }

    handlePermissionChange = (e, updatePermissions) => {
        const { target: { value, checked } } = e;
        let updatedPermissions = this.state.permissions;
        if (checked) {
            updatedPermissions.push(value)
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== value);
        }
        this.setState({
            permissions: updatedPermissions
        }, () => updatePermissions());
    }

    render() {
        const { user } = this.props;
        const { permissions } = this.state;
        return (
            <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
                permissions: permissions,
                userId: user.id
            }}>
                {(updatePermissions, { loading, error }) => ( 
                    <>    
                    {error && <tr><td colSpan={3 + possiblePermissions.length}><Error error={error} /></td></tr>}               
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {possiblePermissions.map((permission, index) => (
                            <td key={index}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input type="checkbox" id={`${user.id}-permission-${permission}`} onChange={e =>this.handlePermissionChange(e, updatePermissions)} checked={permissions.includes(permission)} value={permission} />
                                </label>
                            </td>
                        ))}
                        <td>
                        <SickButton onClick={updatePermissions} type="button" disabled={loading}>Updat{loading ? 'ing' : 'e'}</SickButton>
                        </td>
                    </tr>
                    </>
                )}
            </Mutation>
        )
    }
}

export default Permissions
