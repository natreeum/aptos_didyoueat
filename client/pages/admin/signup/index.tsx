import AdminLayout from "@/src/components/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/src/components/Loading";
import { Router, useRouter } from "next/router";

export default function AdminSignup() {
  const SERVER_URL = process.env.SERVER_URL + "/auth/owner/signup";
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState(false);
  const [isWating, setIsWating] = useState(false);

  const handleEamilChange = (e: any) => {
    const regExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setUserEmail(e.target.value);
    setIsEmailValid(regExp.test(e.target.value));
  };
  const handlePasswordChange = (e: any) => {
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    setUserPassword(e.target.value);
    setIsPasswordValid(regExp.test(e.target.value));

    console.log(e.target.value);
    console.log(regExp.test(e.target.value));
  };
  const handlePasswordCheckChange = (e: any) => {
    setUserPasswordCheck(e.target.value);
    if (e.target.value === userPassword) setIsSamePassword(true);
    if (e.target.value === "") setIsSamePassword(false);
  };

  const handleSubmit = () => {
    if (isEmailValid && isPasswordValid && isSamePassword) {
      setIsWating(true);
      axios
        .post(SERVER_URL, {
          id: userEmail,
          password: userPassword,
        })
        .then((res) => {
          setIsWating(false);
          if (res.status === 201) {
            alert("아이디 만들기 성공! 로그인하세유~");
            router.push("/admin");
          } else if (res.status === 200) {
            alert("이미 존재하는 이메일입니다. 비밀번호는 못찾아유");
          }
        })
        .catch((err) => {
          setIsWating(false);
          console.log(err);
        });
    }
  };

  return (
    <AdminLayout setLoginToggle={undefined}>
      <div className="admin-signup">
        <div className="admin-signup__heading">
          <h2>Admin ID</h2>
        </div>
        <div className="admin-signup__container">
          <div className="admin-signup__title">
            <h1>Create Your DYE ID</h1>
            <p>
              하나의 사장님 게정으로 모든 DidYouEat 서비스를 이용하실 수 있습니다.
              <br />
              DidYouEat Admin ID를 가지고 계십니까?{" "}
              <Link href="/admin">
                <span> 로그인하기 ↘</span>
              </Link>
            </p>
          </div>
          <div className="admin-signup__body">
            <div className="admin-signup__id">
              <div className="input-area">
                <input
                  className={!isEmailValid && userEmail !== "" ? "warning" : `${isEmailValid ? "valid" : ""}`}
                  onChange={handleEamilChange}
                  value={userEmail}
                  type="text"></input>
                <label
                  htmlFor="input"
                  className={userEmail === "" ? "label-placeholder" : " label-placeholder is-written"}>
                  name@example.com
                </label>
              </div>
            </div>
            {/* <div className="admin-signup__warning">
              {" "}
              <p>ℹ️ 유효한 이메일 주소를 입력하십시오.</p>
            </div> */}
            <div className="admin-signup__id-description">
              {" "}
              <p>새 사장님 계정으로 사용될 이메일주소입니다.</p>
            </div>
            <div className="admin-signup__pw">
              <div className="input-area">
                <input
                  className={!isPasswordValid && userPassword !== "" ? "warning" : `${isPasswordValid ? "valid" : ""}`}
                  onChange={handlePasswordChange}
                  type="password"></input>
                <label
                  htmlFor="input"
                  className={userPassword === "" ? "label-placeholder" : "label-placeholder is-written"}>
                  암호
                </label>
                <div
                  className={
                    userPassword === "" ? "password-validation" : "password-validation password-validation__check"
                  }>
                  <div>
                    <svg
                      className={userPassword.length >= 8 ? "green-svg" : ""}
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" />{" "}
                      </g>{" "}
                    </svg>
                    8자이상이여야 합니다.
                  </div>

                  <div>
                    <svg
                      className={/(?=.*[A-Z])/.test(userPassword) ? "green-svg" : ""}
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" />{" "}
                      </g>{" "}
                    </svg>
                    대,소문자가 포함되어야 합니다.
                  </div>

                  <div>
                    <svg
                      className={/(?=.*[0-9])/.test(userPassword) ? "green-svg" : ""}
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" />{" "}
                      </g>{" "}
                    </svg>
                    숫자가 포함되어야 합니다.
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-signup__pw-check">
              <div className="input-area">
                <input
                  className={
                    !isSamePassword && userPasswordCheck !== "" ? "warning" : `${isSamePassword ? "valid" : ""}`
                  }
                  onChange={handlePasswordCheckChange}
                  type="password"></input>
                <label
                  htmlFor="input"
                  className={userPasswordCheck === "" ? "label-placeholder" : "label-placeholder is-written"}>
                  암호 확인
                </label>
              </div>
            </div>
            <div className="button-container">
              <div onClick={handleSubmit} className="yellow-color classic-button">
                계정 생성
              </div>
              {isWating && <Loading></Loading>}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
