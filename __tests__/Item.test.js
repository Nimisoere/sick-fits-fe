import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const fakeItem = {
    id: '1234',
    title: 'A cool item',
    price: 4000,
    description: 'Test item',
    image: 'test.jpg',
    largeImage: 'test.jpg'
};

describe('<Item />', () => {
    it('renders and matches snapshot', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem } />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders the price and title properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem } />);
        const PriceTag = wrapper.find('PriceTag');
        const price = PriceTag.children().text();
        expect(price).toBe('$40');

        const title = wrapper.find('Title a').text();
        expect(title).toBe(fakeItem.title);
    });
    it('renders the image properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem } />);
        const img = wrapper.find('img');
        const {src, alt} = img.props();
        expect(src).toBe(fakeItem.image);
        expect(alt).toBe(fakeItem.title);
    });
    it('renders the buttons properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem } />);
        const buttonList = wrapper.find('.buttonList').children();
        expect(buttonList).toHaveLength(3);
        expect(buttonList.find('Link')).toHaveLength(1);
        expect(buttonList.find('Link').exists()).toBe(true);
        expect(buttonList.find('AddToCart').exists()).toBe(true);
        expect(buttonList.find('DeleteItem').exists()).toBe(true);

    });
});