import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue :Float = 300;
  // currentValue := 100;

  stable var startTime = Time.now();
 Debug.print(debug_show(startTime));
  let id =1213123123;
  // id := lklk This wouldnt work

 
  Debug.print(debug_show(id));

// this is a private function
  func topUpPrivate(number: Float){
    currentValue +=number;
    Debug.print(debug_show(currentValue));
  };
  topUpPrivate(57);

// this is a public function
  public func topUp(number: Float){
    currentValue +=number;
    Debug.print(debug_show(currentValue));
  };
  
  public func withdrawl(amount: Float){
    let tempValue: Float = currentValue - amount;
    if(tempValue <=0){
      currentValue -=amount;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("You have no sufficient value in your account")
    }
  };

  public query func checkBalance():async Float {
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();

    let timeElapsedNS = currentTime - startTime;

    let timeElapsedS = timeElapsedNS / 1000000000;

    // This equation is to do the compound value (economics) Amount = Amount * (1 + %interests)**time

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime
  };

}
