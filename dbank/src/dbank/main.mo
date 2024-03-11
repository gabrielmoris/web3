import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor DBank {
  stable var currentValue :Nat = 300;
  // currentValue := 100;

  let id =1213123123;
  // id := lklk This wouldnt work

 
  Debug.print(debug_show(id));

// this is a private function
  func topUpPrivate(number: Nat){
    currentValue +=number;
    Debug.print(debug_show(currentValue));
  };
  topUpPrivate(57);

// this is a public function
  public func topUp(number: Nat){
    currentValue +=number;
    Debug.print(debug_show(currentValue));
  };
  
  public func withdrawl(amount: Nat){
    let tempValue: Int = currentValue -amount;
    if(tempValue <=0){
      currentValue -=amount;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("You have no sufficient value in your account")
    }
  };

  public query func checkBalance():async Nat {
    return currentValue;
  };

}
