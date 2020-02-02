import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import Signup, { SIGNUP_MUTATION } from '../components/Signup';
import toJson from 'enzyme-to-json';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';

function type(wrapper, name, value) {
    wrapper.find(`input[name="${name}"]`).simulate('change', {
        target: {name, value}
    });
}

const me = fakeUser();

const mocks = [{
    request: {
        query: SIGNUP_MUTATION,
        variables: {
            email: me.email,
            name: me.name,
            password: 'test'
        }
    },
    result: {
        data: {
            signup: {
                __typename: 'User',
                id: '12345',
                email: me.email,
                name: me.name
            }
        }
    }
},
{
    request: {
        query: CURRENT_USER_QUERY
    },
    result: { data: { me } }
}
];

describe('<Signup />', () => {
    it('renders and matched snapshot', () => {
        const wrapper = mount(
            <MockedProvider>
                <Signup />
            </MockedProvider>
        );
        const form = wrapper.find('form[data-test="form"]');
        expect(toJson(form)).toMatchSnapshot();
    });
    it('calls the mutation properly', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <Signup />
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        type(wrapper, 'name', me.name);
        type(wrapper, 'email', me.email);
        type(wrapper, 'password', 'test');
        wrapper.update();
        wrapper.find('form').simulate('submit');
        await wait();
        const user = await apolloClient.query({query: CURRENT_USER_QUERY});
        expect(user.data.me).toMatchObject(me)
    });
});