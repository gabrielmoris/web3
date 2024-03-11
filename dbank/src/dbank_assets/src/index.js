import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  update();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  }

  if (document.getElementById("withdraw-amount").value.length != 0) {
    await dbank.withdraw(withdrawAmount);
  }

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdraw-amount").value = "";
  button.removeAttribute("disabled");
});

async function update() {
  await dbank.compound();
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}
