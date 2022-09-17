/* import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' */

import React from 'react'
import HomeProducts from '../components/HomeProducts';
import NavbarHomeClient from '../components/NavbarHomeClient';


function Home() {
  return (
    <div>
      <NavbarHomeClient/>
      <HomeProducts />
    </div>
  )
}

export default Home
