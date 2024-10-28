import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nickname: '',
    age: '',
    phonenumber: '',
    email: '',
    gender: '',
    height: '',
    weight: '',
    exercise_frequency: ''
  });

  const updateFormData = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data
    }));
  };

  return (
    <UserContext.Provider value={{ formData, updateFormData }}>
      {children}
    </UserContext.Provider>
  );
};