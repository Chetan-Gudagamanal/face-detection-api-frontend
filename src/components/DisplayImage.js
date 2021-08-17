import { Container } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'


export default function DisplayImage({box,imageLink}){
    return(
        
        <Container>
            <Card className="image_section">
                <div className="image_area">
                <Image src={imageLink} width="500px" height="auto" id="inputImage"/>
                {/* <img id="inputImage" src={imageLink} alt="" width="500px" height="auto"/> */}
                {console.log(box)}
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                </div>

            </Card>
        </Container>
        
    )
}

