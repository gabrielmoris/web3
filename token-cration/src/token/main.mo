import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    // this string is the token that i got from the command dfx identity get-principal
    let owner : Principal = Principal.fromText("xngfm-myszx-s5nlj-mk7tf-igsfy-arorl-g27yz-pvykc-rzzlz-uv6wx-jqe");

    // How many coins are in the world
    let totalSupply : Nat= 1000000000;
    // Name of the curency
    let symbol :Text = "RENTIO";

    // Since the HashMap cant be stable, this is a workaround to make the balances persistant. 
    // This is not used as a primary option because of the computing resources it needs to handlle data and search.
    // this are systen functions provided from Motoko Language.
    private stable var balanceEntries : [(Principal, Nat)] =[];

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(), 1, Principal.equal,Principal.hash);
        if(balances.size() < 1 ){
            balances.put(owner, totalSupply);
        };
    };

    // this is a hashmap that saves the owner and amount of currency
    private var balances =HashMap.HashMap<Principal,Nat>(1, Principal.equal,Principal.hash);
    // In case someone starts the project from 0
    if(balances.size() < 1 ){
        balances.put(owner, totalSupply);
    };



    public query func balanceOf(who: Principal):async Nat{
        // Because of the types this will be problematic so we use a switch better
        // if(balances.get(who)== null){
        //     return 0;
        // }else{
        //     return balances.get(who);
        // }
        let balance :Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol():async Text{
        return symbol;
    };

    // https://internetcomputer.org/docs/current/motoko/main/sharing/#the-shared-keyword
    public shared (msg) func payOut(amount:Nat): async Text{
        // In this wahy the cannister will send the funds, not the owner, for that I will need to send some funds to the canister  in the command line:
        // 1.  Check canister ID: dfx canister id token
        // 2. Save canister ID into a command line variable: CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
        // 3. Check canister ID has been successfully saved: echo $CANISTER_PUBLIC_KEY
        // 4. Transfer half a billion tokens to the canister Principal ID: dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
        // Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null){
            let resultTransation = await transfer(msg.caller, amount);
            return resultTransation;
        } else{
            return "You already claimed the Tokens!";
        }
    };

    public shared (msg) func transfer(to: Principal, amount: Nat): async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        }else{
            return "Insufficient Funds";
        }
    };
};