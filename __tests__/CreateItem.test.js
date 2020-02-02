import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import toJson from 'enzyme-to-json';
import Router from 'next/router';
import { fakeItem } from '../lib/testUtils';

const dogImage = 'https://dog.com/dog.jpg';

global.fetch = jest.fn().mockResolvedValue({
    json: () => ({
        secure_url: dogImage,
        eager: [{
            secure_url: dogImage
        }]
    })
})

describe('<RequestRest />', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        const form = wrapper.find('form[data-test="form"]');
        expect(toJson(form)).toMatchSnapshot();
    });
    it('uploads a file when changes', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        const input = wrapper.find('input[type="file"]');
        input.simulate('change', { target: { files: ['fakeDog.jpg'] } });
        await wait();
        const component = wrapper.find('CreateItem').instance();
        expect(component.state.image).toEqual(dogImage);
        expect(component.state.largeImage).toEqual(dogImage);
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockReset();
    });
    it('handles state updating', () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem />
            </MockedProvider>
        );
        wrapper.find('#title').simulate('change', { target: { name: 'title', value: 'Testing' } });
        wrapper.find('#price').simulate('change', { target: { name: 'price', value: 5000, type: 'number' } });
        wrapper.find('#description').simulate('change', { target: { name: 'description', value: 'Awesome stuff' } });
        const component = wrapper.find('CreateItem').instance();
        expect(component.state).toMatchObject({
            title: 'Testing',
            price: 5000,
            description: 'Awesome stuff'
        });
    });
    it('creates an item when the form is submitted', async () => {
        const item = fakeItem();
        const mocks = [{
            request: {
                query: CREATE_ITEM_MUTATION,
                variables: {
                    title: item.title,
                    description: item.description,
                    image: '',
                    largeImage: '',
                    price: item.price
                }
            },
            result: {
                data: {
                    createItem: {
                        ...fakeItem,
                        id: 'abc',
                        __typename: 'Item'
                    }
                }
            }
        }];
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem />
            </MockedProvider>
        );
        wrapper.find('#title').simulate('change', { target: { name: 'title', value: item.title } });
        wrapper.find('#price').simulate('change', { target: { name: 'price', value: item.price, type: 'number' } });
        wrapper.find('#description').simulate('change', { target: { name: 'description', value:  item.description } });
        Router.router={push: jest.fn()};
        wrapper.find('form').simulate('submit');
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({
            pathname: '/item', query: {id: 'abc'}
        })
    });

});