

# Virtual Pet 
<sub><sup>
Author: Michael Shields
</sup></sub>
---

This repository is an assignment from the OOP track of the Manchester Codes Syllabus. The assignment is an opportunity to explore and practice:

- The Git/GitHub workflow
- Implementing Code in reference to User Stories
- Test Driven Development concepts and techniques using Jest
- Object Oriented Programming using Constructor Functions & Prototypical Inheritance
- Getter Functions
- Conditional logic
- Implementing Guard Clauses & Throwing exceptions
- Code Refactoring
- Minimising hard-coded values such as "Magic Numbers"

---

## Project Brief

Real pets are great, but they do have drawbacks. They smell. Your mum might be allergic to them. Maybe you just aren't allowed one in your flat.

To solve these problems, we're going to make our own JavaScript pets.

JavaScript pets are great. Because they're made of JavaScript, they can do literally anything, and they don't have any of the drawbacks of regular pets. They don't even pee or poo 💩 (unless you program them too, you weirdo).

- The pets we're going to make will have the following features:

- You can give them a name

- They can get older

- As they get older, they get hungrier and less fit

- You can walk your pet to increase it's fitness. 🏃‍♂️

- You can feed your pet to decrease it's hunger. 🍕

- You can talk to your pet to see if it needs feeding or walking

- If your pet gets too hungry or unfit, it will DIE 💀

- If your pet gets to 30 days old it will DIE 😢

---
## Cloning and Setup

1. Clone the repository: 
   - via http: 
   ```bash
   git clone https://github.com/mike-shields-dev/virtual-pet.git
   ```
   - via ssh: 
   ```bash
   git clone git@github.com:mike-shields-dev/virtual-pet.git
   ```
2. Install dependencies: 
     ```bash
     cd virtual-pet && npm install
     ```
3. Testing:
  
    This repository utilises the [Jest]("https://jestjs.io/") JavaScript testing framework. 

    Test file is located in the `__tests__` directory. 

    To run the test suite once: 
    ```bash
    npm test
    ```
    To automatically run the tests as changes are made to the code: 
    ```bash 
    npm run test:watch
    ```

## Pet User Manual

#### Creating and naming a pet: 
```js
const pet = new Pet("Ollie");
```
The `src/PetConfig.json` file contains the default configuration for instantiating pet instances. Both the Pet class and the Pet test suite use this file to configure Pet instances and the Pet test suite.
#### Increasing the pet's age:
```js
pet.growUp()
```
The `AGE`, `FITNESS` and `HUNGER` settings in `src/PetConfig.json`, determine how the `growUp` method changes a pet's respective `age`, `fitness` and `hunger` values. They also determine the thresholds for these properties that will cause the pet to die. As the pet ages it's overall health will deteriorate. Don't worry though! The effects of aging can be counteracted. Unfortunately nothing lives forever, so the pet does have a finite lifetime (`AGE.MAX`). 
#### Checking the pets current status:
The pet will respond with a message, letting you know what it needs.
```js
const petResponse = pet.checkUp()
```
#### Exercising the pet:
Walking the pet will increase it's fitness level.
```js
pet.walk()
```
#### Feeding thd pet:
Feeding the pet will decrease it's hunger level.
```js
pet.feed()
```
---
##### Future Features...
   - Add play method and boredom value
   - Add wash/clean method and hygiene value
   - Add a happiness property that is determined by all of the pets other properties 