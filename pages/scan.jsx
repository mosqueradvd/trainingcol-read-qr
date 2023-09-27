import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import Image from "next/image";

function Scan() {
  const [URL, setURL] = useState("No result");
  const [userAuthToken, setUserAuthToken] = useState("");
  const rebootSystem = () => {
    if (typeof (Storage) !== "undefined") {
      localStorage.removeItem("userAuthToken");
      setTimeout(() => {
        window.location.href = '/'
      }, 500);
      console.log("✅");
    } else {
      console.log("❌");
    }

  }
  useEffect(() => {
    const t = localStorage.getItem("userAuthToken");
    setUserAuthToken(t);
  }, []);

  const checkIn = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        token: userAuthToken.toString(),
      }),
    };

    fetch(URL, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Entrada registrada!',
            showConfirmButton: false,
            timer: 2000
          })

          setTimeout(() => {
            window.location.reload()
          }, 1500);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Salida registrada!',
            showConfirmButton: false,
            timer: 1500
          })
          console.error("Error", response);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (URL) {
      checkIn();
    }
  }, [URL, checkIn]);

  return (
    <>
      <div
        className="min-w-screen  fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 bg-green-100 overflow-y-scroll bg-cover"
      >
        <div className="absolute bg-gradient-to-tl from-indigo-600  to-green-600 opacity-80 inset-0 "></div>
        <div className="relative border-8 overflow-hidden border-gray-900 bg-gray-900 h-full w-full flex flex-col w-64  flex justify-center items-center bg-no-repeat bg-cover shadow-2xl">
          <div className="absolute bg-black opacity-60 inset-0 "></div>
          <div className="camera absolute top-4"></div>
          <div className="flex w-full flex-row justify-center items-center mb-2 px-2 text-gray-50 z-10 absolute top-7">
            <div className="flex flex-col items-center">
              <div className="mt-10 text-white flex mb-7 items-center">
                <Image
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="Training Net Colombia"
                  width={30}
                  height={30}
                />
                <p className="ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
                  Training Net Colombia
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="parent relative border-corner p-1.5 m-auto rounded-xl bg-cover w-58 h-72">
              <div>
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      console.log("🚀 ~ file: scan.jsx:100 ~ Scan ~ result:", result)
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
              <button
                type="submit"
                className="mt-20 z-50 w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center"
                onClick={rebootSystem}
              >
                Reiniciar
              </button>
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
