// src/components/Page4.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./Page4.css";

const Page4 = () => {
  const { formData, updateFormData } = useContext(UserContext);
  const navigate = useNavigate();
  const [gender, setGender] = useState(formData.gender);
  const [height, setHeight] = useState(formData.height);
  const [weight, setWeight] = useState(formData.weight);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFormData({ gender, height, weight });
    navigate('/page5');
  };

  return (
    <div className="page4-container">
      <div className="p4-header">
        <div className="p4-back-arrow" onClick={() => navigate('/page3')}>&larr;</div>
        <div className="p4-progress-text">3/4</div>
      </div>
      <form className="p4-form-group" onSubmit={handleSubmit}>
        <div className="p4-form-item">
          <label className="p4-form-label">성별</label>
          <div className="p4-gender-selection">
            <div className="p4-gender-option">
              <input type="radio" id="M" name="gender" value="M" checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="M" className="p4-gender-label">남자</label>
            </div>
            <div className="p4-gender-option">
              <input type="radio" id="F" name="gender" value="F" checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="F" className="p4-gender-label">여자</label>
            </div>
          </div>
          <div className="p4-form-divider"></div>
        </div>
        <div className="p4-form-item">
          <label className="p4-form-label">키</label>
          <div className="p4-age-input-group">
            <input type="text" className="p4-form-input small-input" value={height} onChange={(e) => setHeight(e.target.value)} />
            <span className="p4-age-label">cm</span>
          </div>
        </div>
        <div className="p4-form-item">
          <label className="p4-form-label">몸무게</label>
          <div className="p4-age-input-group">
            <input type="text" className="p4-form-input small-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <span className="p4-age-label">kg</span>
          </div>
        </div>
        <div className="p4-confirm-button-container">
          <button type="submit" className="p4-confirm-button">확인</button>
        </div>
      </form>
    </div>
  );
};

export default Page4;
