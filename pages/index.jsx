import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const firstTimeAccess = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ username: username, password: password }),
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwgUztsYgTp8TzUUIE68rh2411PGqxyGma6UJVEdwfUWZ1lU3lgjjzgcYrie11c34aC/exec?op=firstTimeAccess&username=" +
          username +
          "&password=" +
          password,
        options
      );

      const data = await response.json();

      if (data.success) {
        const userAuthToken = localStorage.getItem("userAuthToken");
        if (userAuthToken) {
          alert("Ya cuenta con sesión iniciada.");
          window.location.href = "/scan";
        } else {
          localStorage.setItem("userAuthToken", data);
          window.location.href = "/scan";
        }
      } else {
        setErrorMessage(data?.message);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  const getToken = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ username: username, password: password }),
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwgUztsYgTp8TzUUIE68rh2411PGqxyGma6UJVEdwfUWZ1lU3lgjjzgcYrie11c34aC/exec?op=getToken&username=" +
          username +
          "&password=" +
          password,
        options
      );
      const data = await response.text();
      console.log("data", data);
      localStorage.setItem("userAuthToken", data);
      // setToken(data);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const userAuthToken = localStorage.getItem("userAuthToken");
    if (userAuthToken) {
      window.location.href = "/scan";
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Training Net Colombia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-10 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="text-white flex mb-7">
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
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión en tu cuenta
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={(e) => firstTimeAccess(e)}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline text-white"
                  >
                    ¿Olvidaste la contraseña?
                  </a>
                </div>
                {errorMessage && (
                  <div className="text-red-500 mb-4 text-center">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center"
                >
                  {!isLoading ? "Iniciar sesión" : <Spinner />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
