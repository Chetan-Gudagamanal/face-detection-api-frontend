
// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { url } from "../constants";

export default function RegisterPage() {
  const history=useHistory()
  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().email(),
    password: Yup.string().min(8, "Password must be at least 8 chars"),
    confrimPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    )
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async(data) => {
    let rawData=await fetch(`${url}/register`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    })
    let jsonData=await rawData.json()
    if(jsonData._id){
      history.push("/")
      alert("Registration is successful, kindly login to continue")
    }else{
      console.log("Sorry, could not able to register")
    }
  };

  return (
    <>
    <Button 
        variant="contained" 
        color="secondary" 
        className="signOut"
        style={{display:"flex", marginLeft:"auto"}}
        onClick={()=>{history.push("/")}}
    >
        Login
    </Button>
    <p className="heading-text">Create New Account</p>
    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
      <br />
      <input {...register("userEmail")} placeholder="Enter email address" />
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

      <input
        {...register("confrimPassword")}
        type="password"
        placeholder="Confirm password"
      />
      {errors.confrimPassword && (
        <span style={{ color: "crimson" }}>
          {errors.confrimPassword.message}
        </span>
      )}
      <br />

      <input type="submit" />
    </form>
    </>
  );
}
