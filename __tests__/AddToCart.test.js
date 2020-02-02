import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart';
import toJson from 'enzyme-to-json';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils'; import { ApolloConsumer } from 'react-apollo';

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [],
                },
            },
        },
    },
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem()],
                },
            },
        },
    },
    {
        request: { query: ADD_TO_CART_MUTATION, variables: { id: '124' } },
        result: {
            data: {
                addToCart: {
                    __typename: 'CartItem',
                    id: fakeCartItem().id,
                    quantity: 1,
                },
            },
        },
    },
];

describe('<AddToCart />', () => {
    it('renders and matches snapshop', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCart id="124" />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(toJson(wrapper.find('button'))).toMatchSnapshot();
    });
    it('adds an item to cart when clicks', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <AddToCart id="124" />
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
        expect(me.cart).toHaveLength(0);
        wrapper.find('button').simulate('click');
        await wait(50);
        wrapper.update();
        const { data: { me: updatedMe } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
        expect(updatedMe.cart).toHaveLength(1);
        expect(updatedMe.cart[0].id).toBe('omg123');
        expect(updatedMe.cart[0].quantity).toBe(3);
    });
    it('changes from to adding when clicked', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCart id="124" />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(wrapper.text()).toContain('Add to Cart');
        wrapper.find('button').simulate('click');
        expect(wrapper.text()).toContain('Adding to Cart');
    });
});