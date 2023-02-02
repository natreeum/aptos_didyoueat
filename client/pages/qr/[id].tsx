import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import google_logo from "@/public/images/google.png";
import petra from "@/public/images/petra.jpg";
import googleLogo from "@/public/images/googleLogo.png";
import lying_man from "@/public/images/lying_man.png";

import Image from "next/image";

const clientId = "770315293419-o8eldl0qi9germp2s3gtn7i91r83qghp.apps.googleusercontent.com";
const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/redirect&scope=https://www.googleapis.com/auth/userinfo.email`;

export default function MintNFT() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const id = Number(router.query.id);

  useEffect(() => {
    const oAuthHandler = () => {
      window.location.assign(GoogleURL);
      setIsClicked(false);
    };
    if (isClicked) oAuthHandler();
  }, [isClicked]);
  return (
    <div className="qr-mint">
      <h3 className="qr-mint__header">Did You Eat?</h3>
      <div className="qr-mint__body">
        <Image className="lying-man" src={lying_man}></Image>
        <div className="qr-mint__login-box">
          <div
            onClick={() => {
              setIsClicked(true);
            }}
            className="login-button">
            <Image src={googleLogo}></Image>
            <span className="login-button__word">Login with Google</span>
          </div>

          <div className="line">
            <div className="line__or">OR</div>
          </div>

          <div id="petra-button" className="login-button">
            <Image src={petra} width="30px" height="30px"></Image>
            <span>Login with Google</span>
          </div>
        </div>
        <p className="qr-mint__footer">
          If you already have Petra, you can connect here.<br></br>
          If you don't, you can log in with your Google account.<br></br>
          You can lager send your tokens to your Petra wallet.
        </p>
      </div>
    </div>
  );
}
