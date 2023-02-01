import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ClientAddress } from "../recoil/states";
import { RequestKey } from "../recoil/states";
import { useRouter } from "next/router";
import Modal from "react-modal";
import QRCode from "qrcode";

export default function KlipButton() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [reqKey, setReqKey] = useState("");
  const [clientAddress, setClientAddress] = useRecoilState(ClientAddress);
  const [requestKey, setRequestKey] = useRecoilState(RequestKey);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const isAuthenticated = () => {
    axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${reqKey}`).then((res) => {
      if (res.data.result) {
        alert(`Connect Wallet Success!\nYour wallet address : ${res.data.result.klaytn_address}`);
        setShowModal(!showModal);
      } else if (res.status === 400) {
        alert(`Request Time Out`);
        setShowModal(!showModal);
      } else {
        alert(`Klip에서 인증을 진행해 주세요!`);
      }
      if (res.data.result.klaytn_address) {
        setClientAddress(res.data.result.klaytn_address);
        router.push("/collection");
      }
    });
  };

  async function handleConnect() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
    const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
    const iosPlatforms = ["iPhone", "iPad", "iPod"];
    let os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "MacOS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }
    const isMobile = os === "iOS" || os === "Android" ? true : false;
    toggleModal();
    const getKlipPrepareUrl = (request_key: string) => {
      if (isMobile) {
        return (window.location.href = `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`);
      } else {
        return QRCode.toDataURL(`https://klipwallet.com/?target=/a2a?request_key=${request_key}`).then((res) => {
          const imgEl = document.getElementById("authQR");
          imgEl!.setAttribute("src", res);
        });
      }
    };

    const bappName = "DiD You Eat?";
    const getAddress = await axios.post("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
      bapp: { name: bappName },
      type: "auth",
    });
    const { request_key } = getAddress.data;
    setRequestKey(request_key);
    getKlipPrepareUrl(request_key);
    setReqKey(request_key);
  }

  return (
    <div>
      <button className="header__connect" onClick={handleConnect}>
        Klip Connect
      </button>

      <Modal isOpen={showModal}>
        <div className="klip">
          <h2 className="klip__h2">
            QR코드를 스캔해
            <br />
            지갑을 연결하세요
          </h2>
          <canvas id="canvas"></canvas>
          <img className="klip__QR" id="authQR" src="" />
          <div className="klip__buttons">
            <button className="klip__button" onClick={isAuthenticated}>
              인증완료
            </button>
            <button className="klip__button" onClick={toggleModal}>
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
