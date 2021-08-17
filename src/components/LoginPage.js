
// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';

export default function LoginPage({setCurrentUserFaceDetectCount,setCurrentUserName,setCurrentUserId}) {
  const history=useHistory()
  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().email('Must be a valid email'),
    password: Yup.string().min(8, "Password must be at least 8 chars")
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async(data) => {
    const rawData=await fetch("https://face-detection-backend-server.herokuapp.com/login",
    {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    })
    const jsonData=await rawData.json()
    if(jsonData._id){
      setCurrentUserName(jsonData.userEmail)
      setCurrentUserFaceDetectCount(jsonData.faceDetectCount)
      setCurrentUserId(jsonData._id)
      history.push("/homepage")
    }else{
      alert("Invalid credentials")
    }
  };

  return (
    <>
    <Button 
        variant="contained" 
        color="secondary" 
        className="signOut"
        style={{display:"flex", marginLeft:"auto"}}
        onClick={()=>{history.push("/register")}}
    >
        Sign Up
    </Button>
    <p className="heading-text">Login</p>
    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
      <br />
      <input {...register("userEmail")} placeholder="Enter emial address" />
      {errors.userEmail && (
        <span style={{ color: "crimson" }}> {errors.userEmail.message} </span>
      )}
      <br />
      <input
        {...register("password")}
        type="password"
        placeholder="Enter your password"
      />
      {errors.password && (
        <span style={{ color: "crimson" }}> {errors.password.message} </span>
      )}
      <br />
      <br />

      <input type="submit" />
    </form>
    </>
  );
}


