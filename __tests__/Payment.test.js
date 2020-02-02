import { mount } from 'enzyme';
import wait from 'waait';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Payment from '../components/Payment';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import Nprogress from 'nprogress';
import Router from 'next/router';

Router.router = {
    push(){}
}

const mocks = [
    {
        request: {query: CURRENT_USER_QUERY},
        result: {
            data: {me: {
                ...fakeUser(),
                cart: [fakeCartItem()]
            }}
        }
    }
]

describe('<Payment />', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const checkoutButton = wrapper.find('ReactStripeCheckout');
        expect(toJson(checkoutButton)).toMatchSnapshot();
    });
    it('creates an order ontoken', async () => {
        const createOrderMock = jest.fn().mockResolvedValue({
            data: {createOrder: {id: '0987'}}
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const component = wrapper.find('Payment').instance();
        component.onToken({id: '0987'}, createOrderMock);
        expect(createOrderMock).toHaveBeenCalled();
        expect(createOrderMock).toHaveBeenCalledWith({variables: {token: '0987'}})
    });
    it('turns the progressbar on', async () => {
        const createOrderMock = jest.fn().mockResolvedValue({
            data: {createOrder: {id: '0987'}}
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        Nprogress.start = jest.fn();
        const component = wrapper.find('Payment').instance();
        component.onToken({id: '0987'}, createOrderMock);
        expect(Nprogress.start).toHaveBeenCalled();
    });
    it('routes to the page after order', async () => {
        const createOrderMock = jest.fn().mockResolvedValue({
            data: {createOrder: {id: '0987'}}
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Payment />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        Router.router.push = jest.fn();
        const component = wrapper.find('Payment').instance();
        component.onToken({id: '0987'}, createOrderMock);
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({
            pathname: '/order', query: {id: '0987'}
        })
    });
});