const petConfig = {
  AGE_INIT: 0,
  AGE_MAX: 30,
  AGE_INCREMENT: 1,
  FITNESS_INIT: 10,
  FITNESS_MIN: 0,
  FITNESS_INCREMENT: 4,
  FITNESS_DECREMENT: 3,
  FITNESS_THRESHOLD: 3,
  HUNGER_INIT: 0,
  HUNGER_MAX: 10,
  HUNGER_INCREMENT: 5,
  HUNGER_DECREMENT: 3,
  HUNGER_THRESHOLD: 5
};

class Pet {
  constructor(name) {
    if (!(typeof name === 'string' || name === undefined)) {
      throw new TypeError('name must be a string or undefined');
    }
    this.name = name;
    this.age = petConfig.AGE_INIT;
    this.fitness = petConfig.FITNESS_INIT;
    this.hunger = petConfig.HUNGER_INIT;
    this.children = []
  }

  growUp() {
    if (!this.isAlive) throw 'Your pet is no longer alive';
    this.age += petConfig.AGE_INCREMENT;
    this.hunger += petConfig.HUNGER_INCREMENT;
    this.fitness -= petConfig.FITNESS_DECREMENT;
  }

  walk() {
    if (!this.isAlive) throw 'Your pet is no longer alive';
    if (this.fitness + petConfig.FITNESS_INCREMENT > petConfig.FITNESS_INIT) {
      this.fitness = petConfig.FITNESS_INIT;
    } else {
      this.fitness += petConfig.FITNESS_INCREMENT;
    }
  }

  feed() {
    if (!this.isAlive) throw 'Your pet is no longer alive';
    if (this.hunger - petConfig.HUNGER_DECREMENT < petConfig.HUNGER_INIT) {
      this.hunger = petConfig.HUNGER_INIT;
    } else {
      this.hunger -= petConfig.HUNGER_DECREMENT;
    }
  }

  checkUp() {
    if (!this.isAlive) throw 'Your pet is no longer alive';
    let petStatus = 'I feel great!';
    if (
      this.fitness <= petConfig.FITNESS_THRESHOLD &&
      this.hunger >= petConfig.HUNGER_THRESHOLD
    ) {
      petStatus = 'I am hungry AND I need a walk';
    } else if (this.hunger >= petConfig.HUNGER_THRESHOLD) {
      petStatus = 'I am hungry';
    } else if (this.fitness <= petConfig.FITNESS_THRESHOLD) {
      petStatus = 'I need a walk';
    }
    return petStatus;
  }

  haveBaby(name) {
    if(!this.isAlive) throw 'Your pet is no longer alive';
    this.children = [new Pet(name), ...this.children];
  }

  adoptChild(child) {
    if (!this.isAlive) throw 'Parent pet is no longer alive';
    if (!(child instanceof Pet)) throw 'Pets can only adopt other pets';
    if (child instanceof Pet && !child.isAlive) throw 'Child pet is no longer alive';

    this.children = [child, ...this.children];
  }

  get isAlive() {
    return (
      this.fitness > petConfig.FITNESS_MIN &&
      this.hunger < petConfig.HUNGER_MAX &&
      this.age < petConfig.AGE_MAX
    );
  }
}

module.exports = {
  Pet,
  petConfig
};
