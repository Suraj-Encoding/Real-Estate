import Image from 'next/image';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';  // Import EmailJS
import usernameIcon from '../assets/icons/Icon.png';
import callIcon from '../assets/icons/callIcon.png';
import emailIcon from '../assets/icons/email.png';
import messageIcon from '../assets/icons/message.png';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  fname: yup.string().required('First name is required'),
  lname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Invalid phone number, please enter numbers only')
    .required('Phone number is required'),
  message: yup.string().required('Message is required'),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [submitting, setSubmitting] = useState(false);

  // EmailJS function to send email
  const sendEmail = (data) => {
    const { fname, lname, email, phone, message } = data;

    const to_email = process.env.NEXT_PUBLIC_TO_EMAIL;

    // EmailJS service details
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_USER_ID;

    const templateParams = {
      fname,
      lname,
      email,
      to_email,
      phone,
      message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Email sent successfully!');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        toast.error('Failed to send email. Please try again later.');
      });
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      sendEmail(data); // Call the sendEmail function here
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact" className="relative p-4 mb-4">
      <div className="flex justify-center items-center  p-3">
        <button className="mt-[90px] mb-4 bg-orange-200 hover:bg-orange-600 px-4 py-1 rounded-2xl text-orange-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
          contacts
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center">
          <p className=" text-8xl  sm:text-10xl text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase dark:text-white">
            contacts
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-20 relative capitalize mt-7 sm:mt-14 dark:text-gray-300">
            get in touch now
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20 mb-10 text-bluePText">
          We have developed a unique space where you can work and create.
          <br /> We thought of everything to the smallest detail.
          <br />
          You will be able to conduct your business, conduct meetings, meetings
        </p>
      </div>

      {/* FORM */}

      <div className=" sm:flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex flex-col justify-center items-center gap-[30px] p-0 w-[670px] h-full ">
            {/* 1st row */}
            <div className="sm:flex items-start p-0 gap-[30px] w-full h-[60px] relative">
              <div className="flex flex-col">
                <label className="relative">
                  <input
                    {...register('fname')}
                    name="fname"
                    placeholder="First Name"
                    className="flex justify-between items-center rounded-xl py-[15px] px-[30px] shadow-md sm:w-[320px] h-[60px] capitalize mb-5 sm:mb-0 dark:bg-gray-600"
                  />
                  <Image
                    src={usernameIcon}
                    alt="username icon"
                    className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                  />
                </label>
                {errors.fname && (
                  <span className=" text-red-500 text-xs text-center mt-1">
                    required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="relative">
                  <input
                    {...register('lname')}
                    name="lname"
                    placeholder="Last Name"
                    className="flex justify-between items-center  rounded-xl py-[15px] px-[30px] shadow-md sm:w-[320px] h-[60px] capitalize mb-5 sm:mb-0 dark:bg-gray-600"
                  />
                  <Image
                    src={usernameIcon}
                    alt="username icon"
                    className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                  />
                </label>
                {errors.lname && (
                  <span className="text-red-500 text-xs mt-1 text-center">
                    required
                  </span>
                )}
              </div>
            </div>

            {/* 2nd row */}
            <div className="sm:flex items-start p-0 gap-[30px] w-full h-[60px] relative mt-36 sm:mt-0">
              <div className="flex flex-col">
                <label className="relative ">
                  <input
                    {...register('email')}
                    name="email"
                    placeholder="Email Address"
                    className="flex justify-between items-center  rounded-xl py-[15px] px-[30px] shadow-md sm:w-[320px] h-[60px] capitalize  mb-5  sm:mb-0 dark:bg-gray-600"
                  />
                  <Image
                    src={emailIcon}
                    alt="email icon"
                    className="w-5 h-4 absolute right-5 top-1/2 transform -translate-y-1/2"
                  />
                </label>
                {errors.email && (
                  <span className="text-red-500 text-xs text-center">
                    required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="relative">
                  <input
                    {...register('phone')}
                    name="phone"
                    placeholder="Phone Number"
                    className="flex justify-between items-center  rounded-xl py-[15px] px-[30px] shadow-md sm:w-[320px] h-[60px] mb-5  sm:mb-0 dark:bg-gray-600"
                  />
                  <Image
                    src={callIcon}
                    alt="phone icon"
                    className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                  />
                </label>
                {errors.phone && (
                  <span className="text-red-500 text-xs text-center">
                    required
                  </span>
                )}
              </div>
            </div>

            {/* 3rd row  */}

            <div className="sm:flex justify-between items-center p-0 gap-[10px] w-full h-[60px] relative mt-36 sm:mt-0">
              <div className="flex flex-col">
                <label className="relative">
                  <input
                    {...register('message')}
                    name="message"
                    placeholder="Your Message"
                    className="flex justify-between items-center  rounded-xl py-[15px] px-[30px] shadow-md sm:w-[670px] h-[60px] overflow-ellipsis overflow-hidden dark:bg-gray-600"
                  />
                  <Image
                    src={messageIcon}
                    alt="message icon"
                    className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                  />
                </label>
                {errors.message && (
                  <span className="text-red-500 text-xs text-center">
                    required
                  </span>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-14 bg-orange-200 hover:bg-orange-600 px-4 py-1 rounded-2xl text-orange-500 hover:text-white h-10 w-30 font-black text-xs uppercase cursor-pointer"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
