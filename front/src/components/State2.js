import React from 'react';
import "./State2.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FaHamburger, FaPizzaSlice, FaDrumstickBite, FaFish, FaBreadSlice, FaCarrot, FaIceCream, FaAppleAlt, FaCookie, FaEgg } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const foodIcons = [
    { icon: FaHamburger, label: 'burger', name: 'Hamburger', calories: 300 },
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

const State2 = ({ className, ...props }) => {
    const navigate = useNavigate();
    const [foodData, setFoodData] = useState([]);
    const [currentEatKcal, setCurrentEatKcal] = useState(0);
    const [currentFoods, setCurrentFoods] = useState([]);

    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜
    const currentDateDisplay = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

    useEffect(() => {
        const fetchData = async () => { 
            const token = localStorage.getItem('access_token'); // 저장된 토큰 가져오기
            try {
                const response = await axios.get('http://127.0.0.1:8000/savecal/eatkcal/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                    responseType: 'json',
                });
                setFoodData(response.data.food_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const todayFood = foodData.find(food => food.date === currentDate); 
        if (todayFood) {
            setCurrentEatKcal(todayFood.eatkcal);
            setCurrentFoods(todayFood.foods);
        }
    }, [foodData, currentDate]);

    const percentConsumed = Math.min((currentEatKcal / 3000) * 100, 100);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh', width: '100vw', marginBottom: 0, backgroundColor: '#F3F4F8' }}>
            <div style={{ marginTop: "20px", width: '350px', height: '62px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 0, color: '#F3F4F8', backgroundColor: '#F3F4F8', borderRadius: '10px' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#000000', fontSize: 24 }} onClick={() => navigate('/state1')} />
                <div className="Calender" style={{ width: 166, height: 47, background: '#B1B8C0', borderRadius: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                    <div className="IconCalender" style={{ width: 44, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#000000', fontSize: 24 }} />
                    </div>
                    <div className="Date" style={{ width: 106, height: 47, color: '#000000', fontSize: 24, fontFamily: 'Noto Sans KR', justifyContent: 'center', alignItems: 'center', fontWeight: '700', wordWrap: 'break-word', display: 'flex' }}>
                        {currentDateDisplay}
                    </div>
                </div>
                <FontAwesomeIcon icon={faHouse} style={{ color: '#000000', fontSize: 24 }} onClick={() => navigate('/')} />
            </div>

            <div className="border-line0" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '10px', marginBottom: '10px' }}></div>

            <div className="Eatkcal" style={{ color: '#ffffff', backgroundColor: '#ffffff', borderRadius: '10px', width: 390, height: 110, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }}>
                <div style={{ marginTop: '10px', alignSelf: 'stretch', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '800', marginLeft: '25.5px', wordWrap: 'break-word' }}>섭취한 칼로리 <span style={{ fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>(kcal)</span></div>
                <div className="Eatgraph" style={{ marginLeft: '25.5px', width: 338, height: 33, position: 'relative' }}>
                    <div className="Rectangle11" style={{ width: 338, height: 33, left: 0, top: 0, position: 'absolute', background: '#F6A8A8', borderRadius: 10 }}>
                        <div className="Rectangle12" style={{ width: `${percentConsumed}%`, height: 33, left: 0, top: 0, position: 'absolute', background: '#FA7070', borderRadius: 8 }}></div>
                    </div>
                </div>
                <div className="Frame42" style={{ marginLeft: '25.5px', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 121, display: 'inline-flex' }}>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>0</div>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>1500</div>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>3000</div>
                </div>
            </div>

            <div className="border-line1" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '20px', marginBottom: '15px' }}></div>

            <div className="Whattoeat" style={{ color: '#ffffff', backgroundColor: '#ffffff', width: 390, borderRadius: '10px', height: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, display: 'inline-flex' }}>
                <div className="Frame6" style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex', marginLeft: 25.5, marginTop: 20 }}>
                    <FontAwesomeIcon icon={faUtensils} style={{ color: '#000000', fontSize: 24, fontWeight: 200 }} />
                    <div style={{ width: 137, textAlign: 'center', color: '#D2AE82', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>오늘의 식사</div>
                </div>
                <div className="Frame36" style={{ width: 339, flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 21, display: 'inline-flex' }}>
                    <div className="Frame7" style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 36, display: 'inline-flex' }}>
                        {currentFoods.slice(0, 2).map((food, index) => {
                            const foodIcon = foodIcons.find(icon => icon.name === food.name);
                            return (
                                <div key={index} className="Rectangle10" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: '150px',
                                    height: '90px',
                                    background: '#D9D9D9',
                                    borderRadius: '60px'
                                }}>
                                    {foodIcon && <FontAwesomeIcon icon={foodIcon.icon} style={{ fontSize: 24, marginBottom: '8px' }} />}
                                    <div className='food-name1' style={{ fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '700', color: 'black' }}>{food.name}</div>
                                    <div className='food-kcal1' style={{ fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', color: 'black' }}>{food.calories}kcal</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="Frame38" style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        {currentFoods.slice(2, 4).map((food, index) => {
                            const foodIcon = foodIcons.find(icon => icon.name === food.name);
                            return (
                                <div key={index} className="Rectangle10" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: '150px',
                                    height: '90px',
                                    background: '#D9D9D9',
                                    borderRadius: '60px'
                                }}>
                                    {foodIcon && <FontAwesomeIcon icon={foodIcon.icon} style={{ fontSize: 24, marginBottom: '8px' }} />}
                                    <div className='food-name1' style={{ fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '700', color: 'black' }}>{food.name}</div>
                                    <div className='food-kcal1' style={{ fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', color: 'black' }}>{food.calories}kcal</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="border-line2" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '20px', marginBottom: '15px' }}></div>
            <div className="Graphoutside" style={{ color: '#ffffff', backgroundColor: '#ffffff', width: 390, borderRadius: '10px', height: 280, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, display: 'inline-flex' }}>
                <div className="Graph" style={{ width: 340, height: 240.65, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div className="graphname" style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex', marginLeft: 10.5, marginTop: 10 }}>
                        <FontAwesomeIcon icon={faChartSimple} style={{ color: '#000000', fontSize: 24, fontWeight: 200 }} />
                        <div style={{ width: 130, textAlign: 'center', color: '#2E2E30', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>주간 그래프</div>
                    </div>
                    <div className='rectnagle-container' style={{ width: '90%', height: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div className="Rectangle2" style={{ width: 20.77, height: '30%', background: '#FA7070', borderRadius: 10 }} />
                        <div className="Rectangle3" style={{ width: 20.77, height: 116.82, background: '#FA7070', borderRadius: 10 }} />
                        <div className="Rectangle4" style={{ width: 20.77, height: `${1 + percentConsumed}%`, background: '#F6A8A8', borderRadius: 10 }} />
                        <div className="Rectangle5" style={{ width: 20.77, height: 140.33, background: '#FA7070', borderRadius: 10 }} />
                        <div className="Rectangle6" style={{ width: 20.77, height: 101.82, background: '#FA7070', borderRadius: 10 }} />
                        <div className="Rectangle7" style={{ width: 20.77, height: 101.82, background: '#FA7070', borderRadius: 10 }} />
                        <div className="Rectangle8" style={{ width: 20.77, height: 101.82, background: '#FA7070', borderRadius: 10 }} />
                    </div>
                    <div className='week-container' style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>월</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>화</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>수</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>목</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>금</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>토</div>
                        <div style={{ width: 15.58, textAlign: 'center', color: '#767676', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>일</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default State2;
