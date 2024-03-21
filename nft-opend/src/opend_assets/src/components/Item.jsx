import React, { useEffect, useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item({ id, role }) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [img, setImg] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState();
  const [priceLabel, setPriceLabel] = useState();

  // const principalId = Principal.fromText(id);
  const localHost = "http://localhost:8080/";
  const HTTPagent = new HttpAgent({ host: localHost });

  HTTPagent.fetchRootKey(); // This is a workaround just for local environment. for PROD DELETE this command.
  let NFTActor;

  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent: HTTPagent,
      canisterId: id,
    });

    const NFTName = await NFTActor.getName();
    const NFTOwner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imgContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(new Blob([imgContent.buffer], { type: "image/png" }));

    setName(NFTName);
    setOwner(NFTOwner.toText());
    setImg(image);

    if (role === "collection") {
      const nftIsListed = await opend.isListed(id);
      if (nftIsListed) {
        setOwner("OpenD");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setButton(<Button handleClick={handleSell} text={"Sell"} />);
      }
    } else if (role === "discover") {
      const originalOwner = await opend.getOriginalOwner(id);

      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }

      const price = await opend.getListedNFTPrice(id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
    }
  }

  let price;
  const handleSell = () => {
    setPriceInput(
      <input placeholder="Price in DANG" type="number" className="price-input" value={price} onChange={(e) => (price = e.target.value)} />
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  };

  const sellItem = async () => {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    const listingResult = await opend.listItem(id, Number(price));

    if (listingResult === "Success") {
      const openDId = await opend.getOpendCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDId);
      if (transferResult === "Success") {
        setOwner("OpenD");
        setSellStatus("Listed");
      }
    }
    setButton();
    setPriceInput();
    setLoaderHidden(true);
  };

  const handleBuy = async () => {
    console.log("buy was triggered");
  };

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img" src={img} style={blur} />
        <div className="lds-ellipsis" hidden={loaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">Owner: {owner}</p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
