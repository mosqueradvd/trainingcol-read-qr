import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";

function Scan() {
  const [URL, setURL] = useState("No result");
  const [userAuthToken, setUserAuthToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("userAuthToken");
    setUserAuthToken(t);
  }, []);

  const checkIn = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        token: userAuthToken,
      }),
    };

    fetch(URL, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          alert("Hora de llegada, registrada!");
        } else {
          alert("Paila, intenta de nuevo");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (URL) {
      checkIn();
    }
  }, [URL]);

  return (
    <>
      <div
        className="min-w-screen  fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 bg-green-100 overflow-y-scroll bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1628254747021-59531f59504b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2134&amp;q=80)",
        }}
      >
        <div className="absolute bg-gradient-to-tl from-indigo-600  to-green-600 opacity-80 inset-0 "></div>
        <div className="relative border-8 overflow-hidden border-gray-900 bg-gray-900 h-full w-full flex flex-col w-64  flex justify-center items-center bg-no-repeat bg-cover shadow-2xl">
          <div className="absolute bg-black opacity-60 inset-0 "></div>
          <div className="camera absolute top-4"></div>
          <div className="flex w-full flex-row justify-between items-center mb-2 px-2 text-gray-50 z-10 absolute top-7">
            <div className="flex flex-row items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-500 text-gray-50 rounded-full mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>{" "}
              <span className="text-sm">QR Code</span>
            </div>
          </div>
          <div className="text-center">
            <div className="parent relative border-corner p-1.5 m-auto rounded-xl bg-cover w-58 h-72">
              <div>
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setURL(result?.text);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  constraints={{ facingMode: "environment" }}
                  style={{
                    width: "288px",
                    height: "100vh",
                    borderRadius: "6px",
                  }}
                  videoContainerStyle={{
                    width: "288px",
                    height: "276px",
                    position: "inherit",
                    borderRadius: "6px",
                  }}
                />
              </div>
              <span className="border_bottom"></span>
            </div>
            <p className="text-gray-300 text-xs mt-3">Escanea el código QR</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scan;
