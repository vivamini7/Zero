import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../axiosConfig'; // 수정된 부분: axiosConfig.js 파일에서 정의한 Axios 인스턴스를 사용하도록 변경
import "./Page1.css";

export const Page1 = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUpClick = () => {
    navigate('/page2'); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login/', formData); 
      // const response = await axios.post('http://127.0.0.1:8000/user/login/', formData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      console.log(response.data);
      const { access, refresh } = response.data.token;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      const userId = response.data.user.id; // 사용자 ID 가져오기
      localStorage.setItem('user_id', userId); // ID 저장
      if (response.data.message ==="login success" ) {
        navigate('/'); 
      }
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      
    }
  };

  return (
    <div className="page1">
      <form onSubmit={handleSubmit}>
        <div className="p1-id-pw-container">
          <div className="p1-id">
            <label htmlFor="username">id</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="p1-input-field" 
              placeholder="아이디" 
              value={formData.username} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className="p1-pw">
            <label htmlFor="password">pw</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="p1-input-field" 
              placeholder="비밀번호" 
              value={formData.password} 
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        <div className="p1-rectangle-28">
          <div className="p1-frame-32">
            <button type="submit" className="p1-rectangle-282">로그인</button>
            <button type="button" className="p1-rectangle-29" onClick={handleSignUpClick}>회원가입</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page1;
