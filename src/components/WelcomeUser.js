export default function WelcomeUser({currentUserName, currentUserFaceDetectCount}){
    return(
        <>
        {/* <p>Welcome </p> */}
        <div>
            <div className='welcome_msg'>
                {`Welcome ${currentUserName},`}<br/>
                
            </div>
            <div className='face_detect_msg'>
                <span className="f3">{`Your total face detection count:`}</span><br/>
                {currentUserFaceDetectCount}
            </div>
        </div>
        </>
    )
}