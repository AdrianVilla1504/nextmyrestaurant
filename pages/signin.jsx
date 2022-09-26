/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { login } from '../services/auth';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Link from 'next/link';
const signin = () => {

  const router = useRouter();

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, profile } = await login(form);
      localStorage.setItem('token', token);
      localStorage.setItem('profile', JSON.stringify(profile));
      console.log("token", token);
      console.log("profile", profile);
      if (token) {
        router.push('/');
      } else {
        swal({
          title: 'Error!',
          text: 'Your user or password  is invalid',
          icon: 'error',
          button: 'Try again',
        });
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-full pt-[50px] pb-[150px] lg:pt-[10px] lg:pb-[172px]">
      <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-[100px] lg:h-[200px] w-auto"
              src="https://res.cloudinary.com/dkagy4g5m/image/upload/v1664218685/logo_burgir_jrmwvf.png"
              alt="Logo_1"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handlerSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/register">
                  <a className="font-medium text-[#E18B01] hover:text-[#FF9E00]">
                    Or click here to registe
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF9E00]  py-2 px-4 text-sm font-medium text-white  hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:ring-[#F99A00]"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-[#E18B01] group-hover:text-[#FF9E00]" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default signin;
