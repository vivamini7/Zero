import React, { useState } from 'react';
import { FaUtensils, FaPizzaSlice, FaDrumstickBite, FaFish, FaBreadSlice, FaCarrot, FaIceCream, FaAppleAlt, FaCookie, FaEgg } from 'react-icons/fa';

const foodIcons = [
  { icon: FaPizzaSlice, label: 'pizza', name: 'Pizza', calories: 270 },
  { icon: FaDrumstickBite, label: 'chicken', name: 'Chicken', calories: 250 },
  { icon: FaFish, label: 'fish', name: 'Fish', calories: 200 },
  { icon: FaBreadSlice, label: 'bread', name: 'Bread', calories: 80 },
  { icon: FaCarrot, label: 'carrot', name: 'Carrot', calories: 25 },
  { icon: FaIceCream, label: 'ice-cream', name: 'Ice Cream', calories: 200 },
  { icon: FaAppleAlt, label: 'apple', name: 'Apple', calories: 95 },
  { icon: FaCookie, label: 'cookie', name: 'Cookie', calories: 160 },
  { icon: FaEgg, label: 'egg', name: 'Egg', calories: 70 }
];

const ExerciseRecommendation = ({ onNext }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const toggleFoodSelection = (label) => {
    setSelectedFoods((prevSelectedFoods) =>
      prevSelectedFoods.includes(label)
        ? prevSelectedFoods.filter((food) => food !== label)
        : [...prevSelectedFoods, label]
    );
  };

  const sendFoodData = async (foodData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/savecal/food/', { // 백엔드 엔드포인트 URL 설정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Successfully sent food data:', responseData);
    } catch (error) {
      console.error('Error sending food data:', error);
    }
  };

  const handleNext = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 설정

    const selectedFoodData = selectedFoods.map((label) => {
      const food = foodIcons.find((item) => item.label === label);
      return {
        name: food.name,
        calories: food.calories,
        date: currentDate,
      };
    });

    sendFoodData(selectedFoodData);
    const totalCalories = selectedFoods.reduce((acc, label) => {
      const food = foodIcons.find((item) => item.label === label);
      return acc + (food ? food.calories : 0);
    }, 0);
    onNext(totalCalories);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <FaUtensils style={mainIconStyle} />
        <p style={questionStyle}>어떤 음식을 드셨나요?</p>
        <div style={foodGridStyle}>
          {foodIcons.map(({ icon: Icon, label }, index) => (
            <div
              key={index}
              style={{
                ...foodIconWrapperStyle,
                backgroundColor: selectedFoods.includes(label) ? '#d0eaff' : 'white',
              }}
              onClick={() => toggleFoodSelection(label)}
            >
              <Icon style={foodIconStyle} />
            </div>
          ))}
        </div>
        <button style={nextButtonStyle} onClick={handleNext}>다음</button>
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

const foodGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginBottom: '20px'
};

const foodIconWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '1px solid #ccc',
  padding: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const foodIconStyle = {
  fontSize: '24px',
};

const nextButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c63ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',  
  transition: 'background-color 0.3s',
};

export default ExerciseRecommendation;
