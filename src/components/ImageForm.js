import { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import { url } from "../constants";

export default function ImageForm({setBox,setImageLink,setCurrentUserFaceDetectCount,currentUserId}){
    const [inputText,setInputText]=useState("")
    
    const handleSubmit=async()=>{
        setImageLink(inputText)
        let urlObj={imageUrl:inputText}
        const data=await fetch(`${url}/image`,
            {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(urlObj)
            }
        )
        const jsonData=await data.json()
        .then(jsonData=>{
            console.log(jsonData)
            const faceData=jsonData?.outputs[0]?.data?.regions[0]?.region_info?.bounding_box
            calculateFaceLocation(faceData)
        })
        
        
        const rawData=await fetch(`${url}/image/${currentUserId}`,{
            method:"PUT"
        })
        const jsonData2=await rawData.json()
        setCurrentUserFaceDetectCount(jsonData2.faceDetectCount)
    }
    const calculateFaceLocation=(faceData)=>{
        const image= document.getElementById("inputImage")
        const width=Number(image.width)
        const height=Number(image.height)
        console.log(height,width)
        let boxObj={
            leftCol: faceData.left_col*width,
            topRow: faceData.top_row*height,
            rightCol: width-(faceData.right_col*width),
            bottomRow: height-(faceData.bottom_row*height)
        }
        setBox(boxObj)
    }
    return(
        <Container>
            <Card className="imageForm">
        {/* <p>Paste any face image link here(JPG image files are preffered)</p> */}
        <form>
            <TextField 
                id="outlined-search" 
                label="Image url" 
                type="search" 
                variant="outlined" 
                className="inputField" 
                onChange={(event)=>{
                    setInputText(event.target.value)
                    console.log(event.target.value)
                }}
            />
            <Button 
                variant="contained" 
                color="secondary" 
                className="urlSubmit"
                onClick={()=>{handleSubmit()}}
            >
                Detect Face
            </Button>
            <p className="subText">Need an fun url for quick? Try Submitting below URL and see Magic! in 5 seconds!!!<br/>
            https://tinyjpg.com/images/social/website.jpg
            </p>
        </form>
        </Card>
        </Container>
    )
}