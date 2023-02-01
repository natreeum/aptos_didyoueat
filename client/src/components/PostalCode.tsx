import React, { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";

export default function PostalCode({
  popup,
  setPopup,
  store,
  setStore,
}: {
  popup: any;
  setPopup: any;
  store: any;
  setStore: any;
}) {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    setStore({
      ...store,
      address: fullAddress,
    });
    setPopup(false);
  };

  const togglePopup = () => {
    setPopup(false);
  };

  return (
    <div onClick={togglePopup} className="postmodal">
      <div>
        <DaumPostcode autoClose onComplete={handleComplete} />
      </div>
    </div>
  );
}
