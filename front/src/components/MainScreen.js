import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from './logo.png';
import { FaDumbbell, FaUtensils, FaUser } from 'react-icons/fa';

const appContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#fff',
  margin: 0,
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '375px',
  paddingTop: '0',
  fontFamily: 'Noto Sans KR, sans-serif',
  backgroundColor: '#fff',
  borderRadius: '0px',
  overflow: 'hidden',
  position: 'relative',
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '20px 15px', // Increased padding for larger logo area
  backgroundColor: '#fff',
};

const logoStyle = {
  width: '150px', // Larger logo
  height: '150px',
  objectFit: 'cover',
};

const buttonWrapperStyle = {
  width: '100%',
  height: '30%', // Adjusted height for the button wrapper
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'absolute',
  bottom: '0', // Position the buttons at the bottom
};

const buttonContainerStyle = {
  width: '30%', // Adjust width to ensure three buttons fit nicely
  height: '250px', // Adjusted height
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px', // Rounded ends for rectangular buttons
  cursor: 'pointer', // Ensuring the entire area is clickable
  transition: 'transform 0.3s, background-color 0.3s, color 0.3s', // Smooth transition for hover effects
  position: 'relative',
  overflow: 'hidden',
};

const buttonColors = ['#066979', '#02869A', '#09A2BB']; // Teal-based similar colors

const iconStyle = {
  fontSize: '80px', // Adjusted icon size
  color: 'black',
  position: 'absolute',
  top: '20px',
};

const textStyle = {
  fontSize: '15px', // Adjusted font size
  fontWeight: 'bold',
  color: 'black',
  marginTop: '70px', // Position text below the icon
  opacity: '0', // Initially hidden
  transition: 'opacity 0.3s', // Smooth transition for text appearance
};

const ovalContainerStyle = {
  width: '100%',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '0',
  backgroundColor: '#5A9',
  borderTopLeftRadius: '50% 20%',
  borderTopRightRadius: '50% 20%',
  padding: '10px 0',
  zIndex: 0,
};

const authButtonStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  margin: '0 5px',
  cursor: 'pointer',
};

const ButtonWithHoverEffect = ({ onClick, icon: Icon, text, backgroundColor }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && textRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        buttonRef.current.style.transform = 'translateY(-10px)'; // Move button up on hover
        textRef.current.style.opacity = '1'; // Show text on hover
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        buttonRef.current.style.transform = 'translateY(0)'; // Reset button position
        textRef.current.style.opacity = '0'; // Hide text when not hovered
      });
    }
  }, []);

  return (
    <div style={{ ...buttonContainerStyle, backgroundColor }} onClick={onClick} ref={buttonRef}>
      <Icon style={iconStyle} />
      <span style={{ ...textStyle }} ref={textRef}>{text}</span>
    </div>
  );
};

const MainScreen = ({ onExerciseRecommendation }) => {
  const navigate = useNavigate();

  return (
    <div style={appContainerStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <img src={logoIcon} alt="Logo Icon" style={logoStyle} />
          <div style={{ fontFamily: 'Pacifico, Cursive, Arial, sans-serif', marginTop: '20px', fontSize: '2em', color: '#4A4949' }}>Zero with you</div>
        </div>
        <div style={buttonWrapperStyle}>
          <ButtonWithHoverEffect
            onClick={onExerciseRecommendation}
            icon={FaDumbbell}
            text="Exercise"
            backgroundColor={buttonColors[0]}
          />
          <ButtonWithHoverEffect
            icon={FaUtensils}
            text="Food"
            onClick={() => navigate('/map')}
            backgroundColor={buttonColors[1]}
          />
          <ButtonWithHoverEffect
            icon={FaUser}
            text="Profile"
            onClick={() => navigate('/state1')}
            backgroundColor={buttonColors[2]}
          />
        </div>
        <div style={ovalContainerStyle}>
          <span style={authButtonStyle} onClick={() => navigate('/page1')}>Login</span>
          <span style={authButtonStyle}>/</span>
          <span style={authButtonStyle} onClick={() => navigate('/page2')}>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
