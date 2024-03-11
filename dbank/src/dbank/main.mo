import Debug "mo:base/Debug";

actor DBank {
  var currentValue = 300;
  currentValue := 100;

  let id =1213123123;
  // id := lklk This wouldnt work

  Debug.print(debug_show(currentValue));
  Debug.print(debug_show(id));
}
