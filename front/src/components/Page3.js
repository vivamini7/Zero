import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./Page3.css";

const Page3 = ({ className, ...props }) => {
  const { formData, updateFormData } = useContext(UserContext);
  const navigate = useNavigate();
  const [nickname, setnickname] = useState(formData.nickname || '');
  const [age, setAge] = useState(formData.age || '');
  const [phone1, setPhone1] = useState(formData.phone1 || '');
  const [phone2, setPhone2] = useState(formData.phone2 || '');
  const [phone3, setPhone3] = useState(formData.phone3 || '');
  const [email1, setEmail1] = useState(formData.email1 || '');
  const [email2, setEmail2] = useState(formData.email2 || '');
  const email = email1 + '@' + email2
  const phonenumber = phone1 + phone2 +phone3

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFormData({ nickname, age, phone1, phone2, phone3, email , phonenumber });
    navigate('/page4');
  };

  return (
    <div className={`page3-container ${className}`} {...props}>
      <div className="p3-header">
        <div className="p3-back-arrow" onClick={() => navigate('/page2')}>&larr;</div>
        <div className="p3-progress-text">2/4</div>
      </div>
      <form className="p3-form-group" onSubmit={handleSubmit}>
        <div className="p3-form-item">
          <label className="p3-form-label">이름을 입력해 주세요</label>
          <input type="text" className="p3-form-input" value={nickname} onChange={(e) => setnickname(e.target.value)} />
          <div className="p3-form-divider"></div>
        </div>
        <div className="p3-form-item">
          <label className="p3-form-label">나이를 입력해 주세요</label>
          <div className="p3-age-input-group">
            <span className="p3-age-label">만</span>
            <input type="text" className="p3-form-input p3-age-input" value={age} onChange={(e) => setAge(e.target.value)} />
            <span className="p3-age-label">세</span>
          </div>
          <div className="p3-form-divider"></div>
        </div>
        <div className="p3-form-item">
          <label className="p3-form-label">전화번호를 입력해 주세요</label>
          <div className="p3-phone-inputs">
            <input type="text" className="p3-form-input p3-phone-input" value={phone1} onChange={(e) => setPhone1(e.target.value)} />
            <span className="p3-phone-label">-</span>
            <input type="text" className="p3-form-input p3-phone-input" value={phone2} onChange={(e) => setPhone2(e.target.value)} />
            <span className="p3-phone-label">-</span>
            <input type="text" className="p3-form-input p3-phone-input" value={phone3} onChange={(e) => setPhone3(e.target.value)} />
          </div>
          <div className="p3-form-divider"></div>
        </div>
        <div className="p3-form-item">
          <label className="p3-form-label">이메일을 입력해 주세요</label>
          <div className="p3-email-inputs">
            <input type="text" className="p3-form-input p3-email-input" value={email1} onChange={(e) => setEmail1(e.target.value)} />
            <span className="p3-email-label">@</span>
            <input type="text" className="p3-form-input p3-email-input" value={email2} onChange={(e) => setEmail2(e.target.value)} />
          </div>
          <div className="p3-form-divider p3-email-divider"></div>
        </div>
        <div className="p3-confirm-button-container">
          <button type="submit" className="p3-confirm-button">확인</button>
        </div>
      </form>
    </div>
  );
};

export default Page3;
