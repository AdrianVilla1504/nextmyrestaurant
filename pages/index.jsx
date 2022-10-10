/* import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' */

import React from "react";
import HomeProducts from "../components/HomeProducts";
import NavbarHomeClient from "../components/NavbarHomeClient";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminProducts from "../components/AdminProducts";
import { useEffect, useState } from "react";
import Head from "next/head";

const Home = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("profile"));
    setProfile(result);
  }, []);

  const role = profile?.role;
  console.log("ROL: ", role);

  return (
    <>
      <Head>
        <title>Burguer Factory</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dkagy4g5m/image/upload/v1664211095/hamburguer_pnssvp.png"
        />
      </Head>
      <div className="bg-white lg:px-[30px]">
        {role == "ADMIN" ? (
          <>
            <NavbarAdmin />
            <div className="px-[10px] flex justify-center">
              <AdminProducts />
            </div>
          </>
        ) : (
          <>
            <NavbarHomeClient />
            <div className="px-[10px] pt-[80px] flex justify-center">
              <HomeProducts />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
