import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AccessToken, AdminEmail } from "../recoil/states";
import Loading from "./Loading";

export default function GoogleRedirect() {
  const router = useRouter();
  const accessToken = useRecoilValue(AccessToken);
  const adminEmail = useRecoilValue(AdminEmail);
  const setAccessToken = useSetRecoilState(AccessToken);
  const setAdminEmail = useSetRecoilState(AdminEmail);

  useEffect(() => {
    const url = new URL(window.location.href);
    //? hash를 떼어주고
    const hash = url.hash;
    if (hash) {
      //? 토큰만 떼어주면된다.
      const accessToken = hash.split("=")[1].split("&")[0];
      //? 토큰을 이용한 api 요청.
      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken, {
          headers: {
            authorization: `token ${accessToken}`,
            accept: "application/json",
          },
        })
        .then((res) => {
          setAccessToken(accessToken);
          setAdminEmail(res.data.email);
          // router.push("/");
          //여기서  지갑 생성해주고 민팅해주기
        })
        .catch((e) => console.log("oAuth token expired"));
    }
  }, []);

  return (
    <div className="google-redirect">
      <Loading></Loading>
    </div>
  );
}
