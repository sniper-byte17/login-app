import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'

import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'

export default function Profile() {

  const[file, setFile]= useState()
  const formik = useFormik({
    initialValues :{
      firstNmae:'',
      lastName:'',
      email:'',
      mobile:'',
      address:''
    },
    validate:profileValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
      values=await Object.assign(values, { profile : file || ''})
      console.log(values)
    }

  })
  /**formik does not support file upload hence the need for this function */
  const onUpload= async e =>{
     const base64= await convertToBase64(e.target.files[0]);
     setFile(base64);
  }

  return (
    <div className="container mx-auto">

      <Toaster  position='top=center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{width:"45%", paddingTop:"1rem"}}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-3/3 text-center text-gray-500">
              You can update Your Details
            </span>
          </div>
         
            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-2">
                <label htmlFor="profile">
                <img src={file || avatar} className={`${styles.profile_img} $extend.profile_img}`} alt="avatar" />
                </label>

                <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-2">
               <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`}   type="text" placeholder='LastName' />
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Mobile No' />
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`}   type="text" placeholder='Email' />
                </div>
                  <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='address' />
                  <button className={styles.btn} type="submit">Update</button>
                
              </div>

              <div className="text-center py-4">
                 <span className="text-gray-500">
                  visit later? <Link className="text-red-500" to="/">Log Out</Link>
                  </span>  
              </div>

            </form>
          
        </div>
      </div>
    </div>
  )
}

