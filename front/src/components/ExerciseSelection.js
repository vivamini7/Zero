import React, { useState } from 'react';
import { FaHeart, FaRunning, FaBicycle, FaSwimmer, FaBasketballBall, FaFutbol, FaDumbbell, FaWalking, FaBaseballBall, FaSkiing, FaTableTennis, FaVolleyballBall } from 'react-icons/fa';

const exerciseIcons = [
  { icon: FaFutbol, label: 'soccer', calories: 700 },
  { icon: FaBasketballBall, label: 'basketball', calories: 650 },
  { icon: FaBaseballBall, label: 'baseball', calories: 350 },
  { icon: FaSwimmer, label: 'swimming', calories: 700 },
  { icon: FaDumbbell, label: 'weightlifting', calories: 400 },
  { icon: FaWalking, label: 'walking', calories: 300 },
  { icon: FaRunning, label: 'running', calories: 600 },
  { icon: FaBicycle, label: 'cycling', calories: 500 },
  { icon: FaSkiing, label: 'skiing', calories: 600 },
  { icon: FaTableTennis, label: 'table tennis', calories: 400 },
  { icon: FaVolleyballBall, label: 'volleyball', calories: 300 }
];

const ExerciseSelection = ({ onConfirm, consumedCalories }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  const toggleExerciseSelection = (label) => {
    setSelectedExercises((prevSelectedExercises) =>
      prevSelectedExercises.includes(label)
        ? prevSelectedExercises.filter((exercise) => exercise !== label)
        : [...prevSelectedExercises, label]
    );
  };

  const calculateMinutes = (calories, caloriesPerHour) => {
    const hours = calories / caloriesPerHour;
    const minutes = Math.floor(hours * 60);
    return minutes;
  };

  const handleConfirm = () => {
    const selected = exerciseIcons.filter(({ label }) => selectedExercises.includes(label));
    const date = new Date().toISOString().split('T')[0]; // 현재 날짜를 'YYYY-MM-DD' 형식으로 가져오기

    const exerciseData = selected.map(exercise => ({
      name: exercise.label,
      calories: exercise.calories,
      date: date
    }));

    // 백엔드로 데이터 보내기
    fetch('http://127.0.0.1:8000/savecal/exercise/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exerciseData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    onConfirm(selected);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <FaHeart style={mainIconStyle} />
        <p style={questionStyle}>어떤 운동을 하실건가요?</p>
        <div style={exerciseGridStyle}>
          {exerciseIcons.map(({ icon: Icon, label, calories }, index) => (
            <div
              key={index}
              style={{
                ...exerciseIconWrapperStyle,
                backgroundColor: selectedExercises.includes(label) ? '#d0eaff' : 'white',
              }}
              onClick={() => toggleExerciseSelection(label)}
            >
              <Icon style={exerciseIconStyle} />
              {selectedExercises.includes(label) && (
                <p style={calorieTextStyle}>{calculateMinutes(consumedCalories, calories)} 분</p>
              )}
            </div>
          ))}
        </div>
        <button style={confirmButtonStyle} onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column'
};

const contentStyle = {
  textAlign: 'center',
};

const mainIconStyle = {
  width: '50px',
  marginBottom: '20px',
  fontSize: '40px'
};

const questionStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px'
};

const exerciseGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginBottom: '20px'
};

const exerciseIconWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '1px solid #ccc',
  padding: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const exerciseIconStyle = {
  fontSize: '24px',
};

const calorieTextStyle = {
  marginTop: '5px',
  fontSize: '12px',
  color: '#007bff',
};

const confirmButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c63ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default ExerciseSelection;
