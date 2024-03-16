import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
actor Token {
    // this string is the token that i got from the command dfx identity get-principal
    var owner : Principal = Principal.fromText("xngfm-myszx-s5nlj-mk7tf-igsfy-arorl-g27yz-pvykc-rzzlz-uv6wx-jqe");

    // How many coins are in the world
    var totalSupply : Nat= 1000000000;
    // Name of the curency
    var symbol :Text = "RENTIO";

    // this is a hashmap that saves the owner and amount of currency
    var balances =HashMap.HashMap<Principal,Nat>(1, Principal.equal,Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal):async Nat{
        // BEcause of the types this will be problematic so we use a switch better
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
        // Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null){
        balances.put(msg.caller, amount);
        return "Sucess";
    } else{
        return "You already claimed the Tokens!";
    }
    };
};