import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import NFTActorClass "../nft/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";

// https://internetcomputer.org/docs/current/motoko/main/base/ExperimentalCycles/
actor OpenD {
 
 public shared(msg) func mint(imgData: [Nat8], name: Text) :async Principal {
    let owner : Principal =msg.caller;

    Debug.print(debug_show(Cycles.balance()));
    Cycles.add(100_500_000_000);
    let newNFT = await NFTActorClass.NFT(name,owner,imgData);
    Debug.print(debug_show(Cycles.balance()));

    let newNftPrincipal =await newNFT.getCanisterId();
    return newNftPrincipal;
 };

};
