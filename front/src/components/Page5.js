import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./Page5.css";

const Page5 = ({ className, ...props }) => {
  const { formData, updateFormData } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(formData.exercise_frequency || '');
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateFormData({ exercise_frequency: selectedOption });

    const response = await fetch('http://127.0.0.1:8000/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        exercise_frequency: selectedOption,
      }),
    });
    
    if (response.ok) {
      navigate('/');
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <div className={`page5-container ${className}`} {...props}>
      <div className="p5-header">
        <div className="p5-back-arrow" onClick={() => navigate('/page4')}>&larr;</div>
        <div className="p5-progress-text">4/4</div>
      </div>
      <form className="p5-form-group" onSubmit={handleSubmit}>
        <div className="p5-form-item">
          <label className="p5-form-label">주로 운동을 얼마나 하시나요?</label>
          <div className="p5-dropdown">
            <select className="p5-dropdown-select" value={selectedOption} onChange={handleOptionChange}>
              <option value="1">매우 적음  (사무직)</option>
              <option value="2">약간 활동적 (주 1~3회 운동)</option>
              <option value="3">보통 활동적 (주 3~5회 운동)</option>
              <option value="4">매우 활동적 (주 6~7회 운동)</option>
              <option value="5">극히 활동적 (하루 2회 운동)</option>
            </select>
          </div>
        </div>
        <div className="p5-confirm-button-container">
          <button type="submit" className="p5-confirm-button">확인</button>
        </div>
      </form>
    </div>
  );
};

export default Page5;
