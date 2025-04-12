import { useState, useRef, useContext } from "react";
import { QuizContext } from "../context/quiz";
import StartImage from "../img/start.png"; // Başlangıç resmi
import Video from "../img/video.mp4"; // Video dosyası
import "./Start.css";
import "../App.css";

const Start = () => {
  const [quizState, dispatch] = useContext(QuizContext); // Mevcut durum ve dispatch fonksiyonu
  const [isMuted, setIsMuted] = useState(true); // Video sesi durumu
  const videoRef = useRef(null); // Video elementine erişim sağlamak için ref

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Sesi aç/kapa
      setIsMuted(!isMuted); // Ses durumu güncelleniyor
    }
  };

  return (
    <div className="page-container">
      <div className="welcome">
        
        <h2>Question App - Hoşgeldiniz</h2>
        <ul className="start-list">
      <li>Test 10 sorudan oluşmaktadır.</li>
     <li>Her soru için <strong>30 saniye</strong> süreniz vardır.</li>
     <li><strong>Geriye dönüp</strong> önceki soruya dönüş yapılamaz.</li>
    <li>Test sonunda <strong>doğru</strong>, <strong>yanlış</strong> ve <strong>boş</strong> cevap sayılarınız gösterilir.</li>
         </ul>

        <p>Aşağıdaki butona tıklayarak başlayın.</p>
        <button onClick={() => dispatch({ type: "CHANGE_STAGE" })}>Başla</button>
        
        <img src={StartImage} alt="start" className="start-img" />
      </div>

      <footer>
        {/* Video üzerine tıklanarak sesi açma */}
        <div className="video-container" onClick={handleVideoClick}>
          <video ref={videoRef} autoPlay loop muted={isMuted} playsInline>
            <source src={Video} type="video/mp4" />
            
          </video>
        </div>
        <p className="footer-text">
          Önemli olan benzemesi değil. Önemli olan benim tasarımım bu da benim bir tasarımım... :)
        </p>
      </footer>
    </div>
  );
};

export default Start;
