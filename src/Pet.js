const petConfig = require("./PetConfig")

const {
  AGE,
  FITNESS,
  HUNGER,
  MESSAGES: { ERROR, CHECKUP },
} = petConfig

module.exports = class Pet {
  constructor(name) {
    if (!(typeof name === "string" || name === undefined)) {
      throw new TypeError(ERROR.NAME_TYPE)
    }
    this.name = name
    this.age = AGE.INIT
    this.fitness = FITNESS.INIT
    this.hunger = HUNGER.INIT
    this.children = []
  }

  growUp() {
    if (!this.isAlive) throw ERROR.IS_DEAD
    this.age = Math.min((this.age += AGE.INCREMENT), AGE.MAX)
    this.hunger = Math.min((this.hunger += HUNGER.INCREMENT), HUNGER.MAX)
    this.fitness = Math.max((this.fitness -= FITNESS.DECREMENT), FITNESS.MIN)
  }

  walk() {
    if (!this.isAlive) throw ERROR.IS_DEAD
    this.fitness = Math.min((this.fitness += FITNESS.INCREMENT), FITNESS.INIT)
  }

  feed() {
    if (!this.isAlive) throw ERROR.IS_DEAD
    this.hunger = Math.max((this.hunger -= HUNGER.DECREMENT), HUNGER.INIT)
  }

  checkUp() {
    if (!this.isAlive) throw ERROR.IS_DEAD
    let petStatus = CHECKUP.IS_OK
    if (this.hunger >= HUNGER.THRESHOLD) {
      petStatus = CHECKUP.FEED_ME
    }
    if (this.fitness <= FITNESS.THRESHOLD) {
      petStatus = CHECKUP.WALK_ME
    }
    if (this.fitness <= FITNESS.THRESHOLD && this.hunger >= HUNGER.THRESHOLD) {
      petStatus = `${CHECKUP.FEED_ME} AND ${CHECKUP.WALK_ME}`
    }
    return petStatus
  }

  haveBaby(name) {
    if (!this.isAlive) throw ERROR.IS_DEAD
    this.children = [new Pet(name), ...this.children]
  }

  adoptChild(child) {
    if (!this.isAlive) throw ERROR.IS_DEAD
    if (!(child instanceof Pet)) throw ERROR.ADOPTEE.NOT_A_PET
    if (child instanceof Pet && !child.isAlive) throw ERROR.ADOPTEE.IS_DEAD
    this.children = [child, ...this.children]
  }

  get isAlive() {
    return (
      this.fitness > FITNESS.MIN &&
      this.hunger < HUNGER.MAX &&
      this.age < AGE.MAX
    )
  }
}
