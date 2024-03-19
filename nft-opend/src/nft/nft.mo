import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

// https://internetcomputer.org/docs/current/motoko/main/actor-classes/
// actor classes allows to create cannisters programmatically
// We need to initialize different, now only with dfx deploy. It need some args.

// The = this is a binding that allows me to send the PRincipal in the puclic function
actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {

    private let itemName = name;
    private var nftOwner = owner;
    private let imageBytes = content;

    public query func getName(): async Text {
        return itemName;
    };

    public query func getOwner(): async Principal {
        return nftOwner;
    };

    public query func getAsset(): async [Nat8] {
        return imageBytes;
    };
   
   public query func getCanisterId():async Principal {
    return Principal.fromActor(this);
   };

   public shared (msg) func transferOwnership(newOwner: Principal): async Text {
    if(msg.caller == nftOwner){
        nftOwner := newOwner;
        return "Success";
    }else{
        return "Error: Not initiated by NFT owner."
    };
   };
}