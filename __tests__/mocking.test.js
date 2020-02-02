function Person(name, foods) {
    this.name= name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function(){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.foods), 2000)
    })
}

describe('Mocking tutorial', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('snickers');
        fetchDogs('ajah');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('snickers');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    });
    it('Can create a person', () => {
        const me = new Person('Nimi', ['Sharwama', 'Suya']);
        expect(me.name).toBe('Nimi');
    });
    it('can fetch foods', async () => {
        const me = new Person('Nimi', ['Sharwama', 'Suya']);
        me.fetchFavFoods = jest.fn().mockResolvedValue(['Sushi', 'noodles'])
        const favFoods = await me.fetchFavFoods();
        expect(favFoods).toContain('noodles')
    });
});