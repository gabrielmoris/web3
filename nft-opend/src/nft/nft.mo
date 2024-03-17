import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

// https://internetcomputer.org/docs/current/motoko/main/actor-classes/
// actor classes allows to create cannisters programmatically
// We need to initialize different, now only with dfx deploy. It need some args.
actor class NFT (name: Text, owner: Principal, content: [Nat8]) {

    let itemName = name;
    let nftOwner = owner;
    let imageBytes = content;

    public query func getName(): async Text {
        return itemName;
    };

    public query func getOwner(): async Principal {
        return nftOwner;
    };

    public query func getAsset(): async [Nat8] {
        return imageBytes;
    }
   
}