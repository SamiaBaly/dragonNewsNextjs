'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [isShowPassword, setIsShowPassword]=useState(false);

  const handleRegisterFunc = async(data) => {
    // e.preventDefault();
    // const email=e.target.email.value;
    // const password=e.target.password.value;
    // console.log(email, password);
    console.log(data);
    const {name, photo, email, password}=data;
    console.log(name, photo, email, password);
    const {data:res, error} = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photo,
      callbackURL: "/",
    });
    console.log(res, error);
    if(error){
      alert(error.message)
    }
    if(res){
      alert("signUp successfull")
    }

  };

  return (
    <div className="container mx-auto flex justify-center items-center bg-slate-100 min-h-[80vh]">
      <div className="p-8 rounded-xl bg-white">
        <h2 className="font-bold text-xl text-center">Register your account</h2>
        <div className="divider"></div>
        <form onSubmit={handleSubmit(handleRegisterFunc)} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
              // name='email'
              {...register('name', {
                required: 'name field is required',
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo url</legend>
            <input
              type="text"
              className="input"
              placeholder="Type your phot url"
              // name='email'
              {...register('photo', {
                required: 'photo field is required',
              })}
            />
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              placeholder="Type your email"
              // name='email'
              {...register('email', {
                required: 'email field is required',
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={isShowPassword ? 'text' : 'password'}
              className="input"
              placeholder="Type your password"
              // name="password"
              {...register('password', {
                required: 'Password field is required',
              })}
            />
            <span
              className="absolute right-3 top-4.5 cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </fieldset>
          <button className="btn w-full bg-purple-500 text-white">
            Register
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
