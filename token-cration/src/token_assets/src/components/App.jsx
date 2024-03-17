import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App({ logedInPrincipal }) {
  return (
    <div id="screen">
      <Header />
      <Faucet userPrincipal={logedInPrincipal} />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
