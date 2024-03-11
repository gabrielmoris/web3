import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 0;
  // currentValue := 300;
  // Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  let id = 2348923840928349;
  // Debug.print(debug_show(id));

  public func topUp(amount: Float) {
    currentValue += amount;
    // Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      // Debug.print(debug_show(currentValue));
    } else {
      Debug.print("You have no enough money in your account.")
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  // topUp();

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    let timeElapsedHours = timeElapsedS / (60 * 60);

    // This equation is to do the compound value (economics) Amount = Amount * (1 + %interests)**time
    currentValue := currentValue * (1.005 ** Float.fromInt(timeElapsedHours));
    startTime := currentTime;
  };

}















