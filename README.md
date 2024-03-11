# What is web3

3rd stage of the web => Web based on the blockchain.

# Concepts

## How blockchain Works

The information is hashed wirh a requirement that has to be satisfyed. Then the hash of each block of information would be used as a part of the data for the next block and that block would be hashed.

If someone tries to change the ata of one block, the whole chain would be invalid because wont fullfill the requirements.
[Example to see how Blockchain works](https://guggero.github.io/blockchain-demo/#!/blockchain)

## The internet computer

Its aim is to create the "blockchain singularity". It has an algorithm to escale blockchain apps. It is a lot of canisters that are similar to containers in Docker around internet in different servers.

# Installation and setup for web3

[Documentation](https://docs.google.com/document/d/e/2PACX-1vTNicu-xuf4EiLAehHIqgfpjAnPjzqMGT-xpZVvYaAWNyvzYK_Ceve_me4PVRIxpzH7ea5PAX9NxGwY/pub)

# Motoko Language

It is the language used for internet computer.

- The class that creates the canister is caller actor.

- I can call public Funcrions with `dfx caniester call <canister name> <funcrtion name> '(args)'` for example `dfx caniester call dbank topUp(57)`

  Private functions are not be accessed outside the class.

* When it is regarding functions there are 2 kind of functions Updates an queries.

- Updates needs are asynchronous and persistent but expensivein resources.

```Motoko
  public func topUp(number: Nat){
    currentValue +=number;
    Debug.print(debug_show(currentValue));
  };
```

- Query calls doesnt change the state and are faster

```Motoko
   public query func checkBalance():async Nat {
     return currentValue;
   };
```

- **Orthogonal Persistance** is the hability to hold on to state over many cycles of updates. I make changes in variables, I change the code and the changes in the variables would stay changed as if it were a Databank. It can be used by the keyword _stable_ `stable var currentValue :Nat = 300;`
