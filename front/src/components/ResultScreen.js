import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ResultScreen = ({ consumedCalories, exercises, onExit }) => {
  // 가정된 운동 소모 칼로리 (kcal/hour)
  const exerciseCalories = {
    walking: 300,
    weightlifting: 400,
    running: 600,
    cycling: 500,
    swimming: 700,
    basketball: 650,
    soccer: 700,
    baseball: 350,
    skiing: 600,
    'table tennis': 400,
    volleyball: 300
  };

  const [selectedExercises, setSelectedExercises] = useState([]);

  const calculateMinutes = (calories, caloriesPerHour) => {
    const hours = calories / caloriesPerHour;
    const minutes = Math.floor(hours * 60);
    return minutes;
  };

  const toggleExerciseSelection = (label) => {
    setSelectedExercises((prevSelectedExercises) =>
      prevSelectedExercises.includes(label)
        ? prevSelectedExercises.filter((exercise) => exercise !== label)
        : [...prevSelectedExercises, label]
    );
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={buttonContainerStyle}>
          <button style={recordButtonStyle}>기록하기</button>
          <button style={exitButtonStyle} onClick={onExit}>나가기</button>
        </div>
        <p style={totalCaloriesStyle}>
          당신이 섭취한 칼로리는 <br />
          <span style={caloriesHighlightStyle}>{consumedCalories} kcal</span> <br />
          입니다.
        </p>
        <div style={exerciseStyle}>
          {exercises.map((exercise, index) => (
            <div
              key={index}
              style={exerciseItemStyle}
              onClick={() => toggleExerciseSelection(exercise.label)}
            >
              <exercise.icon style={exerciseIconStyle} />
              {selectedExercises.includes(exercise.label) && (
                <FaCheckCircle style={checkIconStyle} />
              )}
              <p style={exerciseTextStyle}>{calculateMinutes(consumedCalories, exerciseCalories[exercise.label])} 분</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  textAlign: 'center',
};

const contentStyle = {
  textAlign: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px',
};

const recordButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const exitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const totalCaloriesStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const caloriesHighlightStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#FF5722',
};

const exerciseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const exerciseItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
  position: 'relative',
};

const exerciseIconStyle = {
  fontSize: '60px',
  marginBottom: '10px',
};

const exerciseTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const checkIconStyle = {
  color: '#2196F3',
  fontSize: '24px',
  position: 'absolute',
  top: 0,
  right: 0,
};

export default ResultScreen;
