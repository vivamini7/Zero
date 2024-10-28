import React, { useState, useContext } from 'react';import { useNavigate } from 'react-router-dom';
import "./Page2.css";
import { UserContext } from '../context/UserContext';

const Page2 = () => {
  const { formData, updateFormData } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setId] = useState(formData.username);
  const [password, setPassword] = useState(formData.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFormData({ username, password });
    navigate('/page3');
  };

  return (
    <div className="page2-container">
      <div className="p2-header">
        <div className="p2-back-arrow" onClick={() => navigate('/page1')}>&larr;</div>
        <div className="p2-progress-text">1/4</div>
      </div>
      <form className="p2-form-group" onSubmit={handleSubmit}>
        <div className="p2-form-item">
          <label htmlFor="id-input" className="p2-form-label">id</label>
          <input type="text" id="username" className="p2-form-input" value={username} onChange={(e) => setId(e.target.value)} />
          <div className="p2-form-divider"></div>
        </div>
        <div className="p2-form-item">
          <label htmlFor="pw-input" className="p2-form-label">pw</label>
          <input type="password" id="pw-input" className="p2-form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="p2-form-divider"></div>
        </div>
        <div className="p2-confirm-button-container">
          <button type="submit" className="p2-confirm-button">확인</button>
        </div>
      </form>
    </div>
  );
};

export default Page2;
