
import ImageForm from "./ImageForm"
import DisplayImage from "./DisplayImage"
import WelcomeUser from "./WelcomeUser"
import { useState } from "react"
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

export default function HomePage({currentUserName, currentUserFaceDetectCount,setCurrentUserFaceDetectCount,currentUserId}){
    const history=useHistory()
    const [box,setBox]=useState({})
    const [imageLink,setImageLink]=useState("")
    
    return(
        <>
        <Button 
                variant="contained" 
                color="primary" 
                className="signOut"
                style={{display:"flex", marginLeft:"auto"}}
                onClick={()=>{history.push("/")}}
            >
                Sign Out
        </Button>
        <WelcomeUser currentUserName={currentUserName} currentUserFaceDetectCount={currentUserFaceDetectCount}/>
        <ImageForm setBox={setBox} setImageLink={setImageLink} setCurrentUserFaceDetectCount={setCurrentUserFaceDetectCount} currentUserId={currentUserId}/>
        <DisplayImage box={box} imageLink={imageLink}/>
        </>
    )
}