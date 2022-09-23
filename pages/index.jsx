/* import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' */

import React from 'react'
import HomeProducts from '../components/HomeProducts';
import NavbarHomeClient from '../components/NavbarHomeClient';
import NavbarAdmin from '../components/NavbarAdmin';
import AdminProducts from '../components/AdminProducts';
import { useEffect, useState } from 'react';

const Home = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
  const result = JSON.parse(localStorage.getItem('profile'));
  setProfile(result);
  }, []);

  const role = profile?.role;
  console.log("ROL: ", role);

  return (
    <div>
      { role=="ADMIN" ? (
      <>
      <NavbarAdmin />
      <AdminProducts/>
      </>
      )
      :
      (
      <>
      <NavbarHomeClient />
      <HomeProducts />
      </>
      )
      }
    </div>
  )
}

export default Home
