/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const contactus = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("profile"));
    setProfile(result);
  }, []);


  const cart =  useSelector((state) => state.shop.cart);
  event.preventDefault();
  let totalCost = 0;
  cart[0].forEach((product)=>{
    totalCost += product.price*product.qty
  })

  const templateParams = {
    customeremail: profile.email,
    customername: profile.name,
    phone: profile.phone,
    receiptItems: {item: cart[0]},
    totalcost: totalCost,
  }

  emailjs.send('service_ke2hma9', 'template_fhltxdz', templateParams, 'T3PVKKDx5S44WbU-0')
    .then((result) => {
        console.log(`Success, the receipt has benn sent to ${profile.email}`, response.status, result.text);
    }, (error) => {
        console.log("The email HAS NOT been sent", error.text);
    });
  };


export default contactus
