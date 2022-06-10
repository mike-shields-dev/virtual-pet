const { Pet, petConfig } = require('../src/Pet');

describe('Pet constructor', () => {
  it('returns an object', () => {
    expect(new Pet()).toBeInstanceOf(Object);
  });

  it('returns an instance of Pet', () => {
    expect(new Pet()).toBeInstanceOf(Pet);
  });

  it('sets name prop equal to the name argument (if provided)', () => {
    const name = 'Ollie';
    const pet = new Pet(name);
    expect(pet.name).toBe(name);
  });

  it('sets name prop that is undefined (if no name argument is provided)', () => {
    const pet = new Pet();
    expect(pet.name).toBeUndefined();
  });

  it('throws a TypeError if the name argument is not a string', () => {
    expect(() => new Pet(42)).toThrow(TypeError);
    expect(() => new Pet(false)).toThrow('name must be a string or undefined');
  });

  it('sets age prop equal to petConfig.AGE_INIT', () => {
    const pet = new Pet();
    expect(pet.age).toBe(petConfig.AGE_INIT);
  });

  it('sets hunger prop equal to petConfig.HUNGER_INIT', () => {
    const pet = new Pet();
    expect(pet.hunger).toBe(petConfig.HUNGER_INIT);
  });

  it('sets fitness prop equal to petConfig.MAX_FITNESS', () => {
    const pet = new Pet();
    expect(pet.fitness).toBe(petConfig.MAX_FITNESS);
  });
});

describe('Pet prototype', () => {
  it('has growUp method', () => {
    expect(new Pet().growUp).toBeInstanceOf(Function);
  });

  it(`growUp method throws exception "Your pet is no longer alive"
      when pet isAlive method returns false`, () => {
    const pet = new Pet();

    pet.fitness = 0;

    expect(() => pet.growUp()).toThrow('Your pet is no longer alive');
  });

  it('growUp method increments pet age by petConfig.AGE_INCREMENT', () => {
    const pet = new Pet();

    pet.growUp();
    expect(pet.age).toBe(petConfig.AGE_INCREMENT);

    pet.growUp();
    expect(pet.age).toBe(petConfig.AGE_INCREMENT * 2);
  });

  it('growUp method increments hunger prop by petConfig.HUNGER_INCREMENT', () => {
    const pet = new Pet();

    pet.growUp();
    expect(pet.hunger).toBe(petConfig.HUNGER_INIT + petConfig.HUNGER_INCREMENT);

    pet.growUp();
    expect(pet.hunger).toBe(
      petConfig.HUNGER_INIT + petConfig.HUNGER_INCREMENT * 2
    );
  });

  it('growUp method decrements the fitness prop by petConfig.FITNESS_DECREMENT', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.fitness).toBe(
      petConfig.MAX_FITNESS - petConfig.FITNESS_DECREMENT
    );
    pet.growUp();
    expect(pet.fitness).toBe(
      petConfig.MAX_FITNESS - 2 * petConfig.FITNESS_DECREMENT
    );
  });

  it('has walk method', () => {
    const pet = new Pet();
    expect(pet.walk).toBeInstanceOf(Function);
  });

  it(`walk method throws exception "Your pet is no longer alive"
      when pet isAlive method returns false`, () => {
    const pet = new Pet();

    pet.fitness = 0;

    expect(() => pet.walk()).toThrow('Your pet is no longer alive');
  });

  it('walk method increments pet fitness by FITNESS_INCREMENT, but is clamped to MAX_FITNESS', () => {
    const pet = new Pet();

    pet.walk();
    expect(pet.fitness).toBe(petConfig.MAX_FITNESS);

    pet.fitness = 1;

    pet.walk();
    expect(pet.fitness).toBe(1 + petConfig.FITNESS_INCREMENT);

    pet.walk();
    expect(pet.fitness).toBe(1 + petConfig.FITNESS_INCREMENT * 2);
  });

  it('has a feed method', () => {
    const pet = new Pet();
    expect(pet.feed).toBeInstanceOf(Function);
  });

  it(`feed method throws exception "Your pet is no longer alive"
    when pet isAlive method returns false`, () => {
    const pet = new Pet();

    pet.fitness = 0;

    expect(() => pet.feed()).toThrow('Your pet is no longer alive');
  });

  it('feed method decrements pet hunger by HUNGER_DECREMENT but is clamped to HUNGER_INIT', () => {
    const pet = new Pet();

    pet.hunger = 1;

    pet.feed();
    expect(pet.hunger).toBe(petConfig.HUNGER_INIT);

    pet.hunger = 4;

    pet.feed();
    expect(pet.hunger).toBe(4 - petConfig.HUNGER_DECREMENT);
  });

  it('has a checkUp method', () => {
    const pet = new Pet();
    expect(pet.checkUp).toBeInstanceOf(Function);
  });

  it('checkUp method returns "I need a walk" when pet fitness <= FITNESS_THRESHOLD', () => {
    const pet = new Pet();
    pet.fitness = petConfig.FITNESS_THRESHOLD;

    expect(pet.checkUp()).toBe('I need a walk');
  });

  it('checkUp method returns "I am hungry" when pet hunger >= HUNGER_THRESHOLD', () => {
    const pet = new Pet();
    pet.hunger = petConfig.HUNGER_THRESHOLD;

    expect(pet.checkUp()).toBe('I am hungry');
  });

  it(`checkUp method returns "I am hungry AND I need a walk" when 
        pet hunger >= HUNGER_THRESHOLD and 
        pet fitness <= FITNESS_THRESHOLD`, () => {
    const pet = new Pet();

    pet.hunger = petConfig.HUNGER_THRESHOLD;
    pet.fitness = petConfig.FITNESS_THRESHOLD;

    expect(pet.checkUp()).toBe('I am hungry AND I need a walk');
  });

  it(`checkUp method returns "I feel great!" when 
        pet hunger is less than HUNGER_THRESHOLD and 
        pet fitness is greater than or equal to FITNESS_THRESHOLD`, () => {
    const pet = new Pet();

    expect(pet.checkUp()).toBe('I feel great!');
  });

  it(`checkUp method throws exception "Your pet is no longer alive"
      when pet isAlive method returns false`, () => {
    const pet = new Pet();

    pet.fitness = 0;

    expect(() => pet.checkUp()).toThrow('Your pet is no longer alive');
  });

  it(`isAlive getter method returns true when 
      pet age is less than 30
      pet hunger is less than 10
      pet fitness is greater than 0`, () => {
    const pet = new Pet();

    expect(pet.isAlive).toBe(true);
  });

  it('isAlive getter returns false when pet fitness is 0 or less', () => {
    const pet = new Pet();

    pet.fitness = 0;
    expect(pet.isAlive).toBe(false);

    pet.fitness = -1;
    expect(pet.isAlive).toBe(false);
  });

  it('isAlive getter returns false when pet hunger 10 or more', () => {
    const pet = new Pet();

    pet.hunger = 10;
    expect(pet.isAlive).toBe(false);

    pet.hunger = 11;
    expect(pet.isAlive).toBe(false);
  });

  it('isAlive getter returns false when pet age is 30 or more', () => {
    const pet = new Pet();

    pet.age = 30;
    expect(pet.isAlive).toBe(false);

    pet.age = 31;
    expect(pet.isAlive).toBe(false);
  });
});
