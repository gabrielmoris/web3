import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async () => {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount;
});
