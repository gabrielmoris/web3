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

# Deploying to the ICP Live Blockchain

- To be allowed to use the ICP computer network I need ICP tokens, this tokes hav a lifecycle. To get this tokens:

1. go to [this page](https://faucet.dfinity.org/)
2. click on REQUEST CYCLES and then click on ACCEPT INVITE to join the ICP Developer Community official Discord channel.
3. head over to the #cycles-faucet channel and click on the COMPLETE button to agree to the community rules
4. type /request in the message box and hit send
5. Choose from the drop down lists and complete the survey. (You can chose Motoko if you're asked which programming language you will use) fill up the popup that appears afterwards
6. you will get a coupon code
7. go back to the Cycles Faucet page and click Next, then paste in your coupon code
8. Go into your Terminal and check that you have at least dfx 0.12.0 installed. `dfx --version` if your version is lower than 0.12.0 then you can upgrade to the latest version using the command: `sudo dfx upgrade`
9. run in terminal `dfx wallet --network ic redeem-faucet-coupon <YOUR COUPON CODE FROM FAUCET BOT>` (KEEP THIS ID OF THE WALLET)
10. run `dfx wallet --network=ic balance` to check how many coins do I have
11. Go to the directory of the ITC app and write `dfx identity --network ic set-wallet --force <Wallet ID>`
12. Register device on IPC `dfx identity get-principal` and then run `dfx canister --network ic call "<wallet id>" authorize '(principal"<principal id>")'`

13. AND LAST: to deploy run `dfx deploy --network ic`. To see the app run `dfx canister --network ic id dbank_assets`
14. to update the canister run `dfx deploy --network ic` again. It costs less than the deployment
15. the app will be available in `<Canister ID>.raw.ic0.app`

# Deploying a static website to the ICP Live Blockchain

1. Put the files in a folder called **assets**
2. create a json file called `dfx,json`

```json
{
  "canisters": {
    "website": {
      "type": "assets",
      "source": ["assets"]
    }
  }
}
```

3. The process will collapse all the folder structure, so in the index.html we need to delete all references to the folders because everything will be in a flat tructure
4. run `dfx deploy --network ic`
5. run `dfx canister --network ic id website`. The id is the one we choose in the json
6. the app will be available in `<Canister ID>.raw.ic0.app`

# Deleting Canisters in the ICP

1. In the Terminal, go to the project's top level directory and type the following: `dfx canister --network ic status --all`
   This will list all the deployed canisters and all relevant info (including canister name(s) and cycle balance(s)) that is associated with the project. If you get back Error: Cannot find canister id, you are probably in the wrong directory.

2. Once you see the status messages, then type: `dfx canister --network ic stop --all`
   You will see the message: "Stopping code for canister..." for each network-deployed canister.

3. Then type: `dfx canister --network ic delete --all`
   You will then get messages confirming the deleted the canister(s) and that the cycles have been returned to your Cycle Wallet. If you go and reload your Cycle Wallet and see an increased balance, then it worked!

# ICP and react app

1. Copy the indeh.html, index.jsx and components in `dkeeper/src/dkeeper_assets/src`
2. Copy the styles.css in `dkeeper/src/dkeeper_assets/assets`
3. In webpack.config.js modify:
   in line 44: `index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),` instead `    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".js"),`
   in line 71 - 76 uncomment:
   ```javascript
    module: {
    rules: [
      { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
   },
   ```
4. Add a tsconfig.json with:

```json
{
  "compilerOptions": {
    "target": "es2018" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "lib": ["ES2018", "DOM"] /* Specify library files to be included in the compilation. */,
    "allowJs": true /* Allow javascript files to be compiled. */,
    "jsx": "react" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
  },
  "include": ["src/**/*"]
}
```

5. run `dfx start` and then in other console in the same folder `npm install` and finally `dfx deploy`
6. run `npm start`

# Token creation

Inside `src/token/main.mo` will be all backend logic.
to get the identification run `dfx identity get-principal`. The principal id of the default user. We will assing all the tokens to this id.

The rest of this Docs is inside [The project README](token-cration/README.md)
