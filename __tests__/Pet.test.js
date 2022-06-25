const Pet = require("../src/Pet")
const petConfig = require("../src/PetConfig")

const {
  AGE,
  FITNESS,
  HUNGER,
  MESSAGES: { ERROR, CHECKUP },
} = petConfig

describe("new Pet()", () => {
  it("returns an object", () => {
    expect(new Pet()).toBeInstanceOf(Object)
  })

  it("returns an instance of Pet", () => {
    expect(new Pet()).toBeInstanceOf(Pet)
  })

  it("throws if the name argument is not a string", () => {
    expect(() => new Pet(false)).toThrow(ERROR.NAME_TYPE)
  })
})

describe("Pet instance", () => {
  it("name initialised as name argument (if provided)", () => {
    const pet = new Pet("Ollie")
    expect(pet.name).toBe("Ollie")
  })

  it("name initialised as undefined (if name argument not provided)", () => {
    const pet = new Pet()
    expect(pet.name).toBeUndefined()
  })

  describe("initialised with petConfig parameters", () => {
    let pet 

    beforeEach(() => {
      pet = new Pet()
    })

    it("age initialised as initial age", () => {
      expect(pet.age).toBe(AGE.INIT)
    })
  
    it("hunger initialised as initial hunger", () => {
      expect(pet.hunger).toBe(HUNGER.INIT)
    })
  
    it("fitness initialised as initial fitness", () => {
      expect(pet.fitness).toBe(FITNESS.INIT)
    })
  })
})

describe("Pet methods:", () => {
  let pet 
  
  beforeEach(() => {
    pet = new Pet()
  })

  describe("growUp", () => {
    it("is a function", () => {
      expect(Pet.prototype.growUp).toBeInstanceOf(Function)
    })
  
    it("throws when pet is dead", () => {
      pet.age = AGE.MAX
      expect(() => pet.growUp()).toThrow(ERROR.IS_DEAD)
    })

    it("increments age by age increment", () => {
      pet.growUp()
      expect(pet.age).toBe(AGE.INCREMENT)
      pet.growUp()
      expect(pet.age).toBe(AGE.INCREMENT * 2)
    })

    it("cannot increment age past max age", () => {
      pet.age = AGE.MAX - AGE.INCREMENT / 2
      pet.growUp()
      expect(pet.age).toBe(AGE.MAX)
    })
    
    it("increments hunger by hunger increment", () => {
      pet.growUp()
      expect(pet.hunger).toBe(HUNGER.INIT + HUNGER.INCREMENT)
      pet.growUp()
      expect(pet.hunger).toBe(HUNGER.INIT + HUNGER.INCREMENT * 2)
    })
  
    it("cannot set hunger above maximum hunger", () => {
      pet.hunger = HUNGER.MAX - HUNGER.INCREMENT / 2
      pet.growUp()
      expect(pet.hunger).toBe(HUNGER.MAX)
    })
  
    it("decrements fitness by fitness decrement", () => {
      pet.growUp()
      expect(pet.fitness).toBe(FITNESS.INIT - FITNESS.DECREMENT)
      pet.growUp()
      expect(pet.fitness).toBe(FITNESS.INIT - FITNESS.DECREMENT * 2)
    })

    it("cannot set fitness below minimum fitness", () => {
      pet.fitness = FITNESS.MIN + FITNESS.DECREMENT / 2
      pet.growUp()
      expect(pet.fitness).toBe(FITNESS.MIN)
    })
  })
  
  describe("walk", () => {
    it("is a function", () => {
      expect(Pet.prototype.walk).toBeInstanceOf(Function)
    })
  
    it("throws when pet is dead", () => {
      pet.age = AGE.MAX
      expect(() => pet.walk()).toThrow(ERROR.IS_DEAD)
    })
  
    it("increments fitness by fitness increment", () => {
      pet.walk()
      expect(pet.fitness).toBe(FITNESS.INIT)
      pet.fitness = 1
      pet.walk()
      expect(pet.fitness).toBe(1 + FITNESS.INCREMENT)
      pet.walk()
      expect(pet.fitness).toBe(1 + FITNESS.INCREMENT * 2)
    })
  
    it("cannot set fitness above initial fitness", () => {
      pet.walk()
      expect(pet.fitness).toBe(FITNESS.INIT)
    })
  })

  describe("feed", () => {
    it("is a function", () => {
      expect(Pet.prototype.feed).toBeInstanceOf(Function)
    })
  
    it("throws when pet is dead", () => {
      pet.age = AGE.MAX
      expect(() => pet.feed()).toThrow(ERROR.IS_DEAD)
    })
  
    it("decrements hunger by hunger decrement", () => {
      pet.hunger = 4
      pet.feed()
      expect(pet.hunger).toBe(4 - HUNGER.DECREMENT)
    })
  
    it("cannot set hunger below initial hunger", () => {
      pet.hunger = 0
      pet.feed()
      expect(pet.hunger).toBe(HUNGER.INIT)
    })
  })

  describe("checkUp", () => {
    it("is a function", () => {
      expect(Pet.prototype.checkUp).toBeInstanceOf(Function)
    })
  
    it("throws when pet dead", () => {
      pet.age = AGE.MAX
      expect(() => pet.checkUp()).toThrow(ERROR.IS_DEAD)
    })
  
    it(`asks to be walked when fitness is not above fitness threshold`, () => {
      pet.fitness = FITNESS.THRESHOLD
      expect(pet.checkUp()).toBe(CHECKUP.WALK_ME)
    })
  
    it(`asks to be fed when hunger is not below hunger threshold`, () => {
      pet.hunger = HUNGER.THRESHOLD
      expect(pet.checkUp()).toBe(CHECKUP.FEED_ME)
    })
  
    it(`asks to be fed and walked when 
        hunger is not below hunger threshold and 
        fitness is not above fitness threshold`, () => {
      pet.hunger = HUNGER.THRESHOLD
      pet.fitness = FITNESS.THRESHOLD
      expect(pet.checkUp()).toBe(`${CHECKUP.FEED_ME} AND ${CHECKUP.WALK_ME}`)
    })
  
    it(`says it's ok when 
        hunger is less than hunger threshold and 
        fitness is above FITNESS_THRESHOLD`, () => {
      expect(pet.checkUp()).toBe(CHECKUP.IS_OK)
    })
  })

  describe("isAlive", () => {
    it("is a getter", () => {
      expect(
        Object.getOwnPropertyDescriptor(Pet.prototype, "isAlive").get
      ).toBeInstanceOf(Function)
    })
  
    it(`returns true when 
        age is less than maximum age and
        hunger is less than maximum hunger and
        fitness is greater than minimum fitness`, () => {
      expect(pet.isAlive).toBe(true)
    })
  
    it("returns false when fitness equals minimum fitness", () => {
      pet.fitness = FITNESS.MIN
      expect(pet.isAlive).toBe(false)
    })
  
    it("returns false when hunger equals maximum hunger", () => {
      pet.hunger = HUNGER.MAX
      expect(pet.isAlive).toBe(false)
    })
  
    it("returns false when age equals maximum age", () => {
      pet.age = AGE.MAX
      expect(pet.isAlive).toBe(false)
    })
  })

  describe("haveBaby", () => {
    it("is a function", () => {
      expect(Pet.prototype.haveBaby).toBeInstanceOf(Function)
    })

    it("throws exception when isAlive returns false", () => {
      pet.age = AGE.MAX
      expect(() => pet.haveBaby()).toThrow(ERROR.IS_DEAD)
    })

    it("adds new Pet instance to children array", () => {
      pet.haveBaby()
      expect(pet.children.length).toBe(1)
      expect(pet.children[0]).toBeInstanceOf(Pet)
    })
  })

  describe("adoptChild", () => {
    let parent
    let child

    beforeEach(() => {
      parent = new Pet()
      child = new Pet()
    })

    it("is a function", () => {
      expect(Pet.prototype.adoptChild).toBeInstanceOf(Function)
    })
  
    it("throws exception when isAlive returns false", () => {
      const parentPet = new Pet()
      const childPet = new Pet()
      parentPet.age = AGE.MAX
      expect(() => parentPet.adoptChild(childPet)).toThrow(ERROR.IS_DEAD)
    })
  
    it("throws exception when adoptee is not a Pet", () => {
      const parent = new Pet()
      const adoptee = {}
      expect(() => parent.adoptChild(adoptee)).toThrow(ERROR.ADOPTEE.NOT_A_PET)
    })
  
    it("throws exception when adoptee is not alive", () => {
      const parent = new Pet()
      const child = new Pet()
      child.age = AGE.MAX
      expect(() => parent.adoptChild(child)).toThrow(ERROR.ADOPTEE.IS_DEAD)
    })
  
    it("adds child to children array", () => {
      const parent = new Pet()
      const child = new Pet()
      parent.adoptChild(child)
      expect(parent.children).toContain(child)
    })
  
    it("child properties are accessible via parent", () => {
      const parent = new Pet()
      const child = new Pet()
      parent.adoptChild(child)
      expect(parent.children[0].age).toBe(child.age)
    })
  })
})
