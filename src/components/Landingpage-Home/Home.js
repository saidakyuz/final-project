import YoutubeBackground from "react-youtube-background";
import Footer from "./Footer";


const Home = () => {
  return (
    <div>
    <div className="VideoContainer">
      <YoutubeBackground
  //videoId="tgc6YH6X9b0"
  videoId="w4N5iDsb3mw"            
  overlay="rgba(0,0,0,.4)"             
  className="backgroundvideo" 
  >
    </YoutubeBackground>,
  </div>
  <Footer />
  </div>
)
};


export default Home;