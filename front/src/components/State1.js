import React from 'react';
import "./State1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';

const State1 = ({ className, ...props }) => {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }); // 'x월 x일' 형식으로 현재 날짜 얻기
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [eatKcal, setEatKcal] = useState(0);
    const [bmr, setBmr] = useState(0);
    const [burnedkCalories, setBurnedkCalories] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token'); // 저장된 토큰 가져오기
            try {
                const response = await axios.get('http://127.0.0.1:8000/savecal/usercal/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                    responseType: 'json',
                });
                setHeight(response.data.height || 0);
                setWeight(response.data.weight || 0);
                setBmi(response.data.bmi || 0);
                setBmr(response.data.bmr || 0);

                // 현재 날짜와 일치하는 데이터를 찾기
                const todayData = response.data.calories.find(cal => cal.date === new Date().toISOString().split('T')[0]);
                if (todayData) {
                    setEatKcal(todayData.eatKcal || 0);
                    setBurnedkCalories(todayData.burnedkCalories || 0);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // 모든 값들이 숫자인지 확인하고 계산
    const totalCalories = parseFloat(bmr) + parseFloat(burnedkCalories);
    const totalkcal =  totalCalories-parseFloat(eatKcal);

    const percentConsumed = Math.min((eatKcal / 3000) * 100, 100);
    const percentBurned = Math.min((totalCalories / 3000) * 100, 100);
    const totalpercent = Math.min((totalkcal / 3000) * 100, 100);

    console.log(totalkcal);
    console.log(burnedkCalories)
    console.log(bmr)
    return (
        <div className="first" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh', width: '100vw', marginBottom: 0, backgroundColor: '#F3F4F8' }}>
            <div style={{ marginTop: "20px", width: '350px', height: '62px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 0, color: '#F3F4F8', backgroundColor: '#F3F4F8', borderRadius: '10px' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#000000', fontSize: 24 }} onClick={() => navigate('/')} />
                <div className="Calender" style={{ width: 166, height: 47, background: '#B1B8C0', borderRadius: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                    <div className="IconCalender" style={{ width: 44, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#000000', fontSize: 24 }} />
                    </div>
                    <div className="Date" style={{ width: 106, height: 47, color: '#000000', fontSize: 24, fontFamily: 'Noto Sans KR', justifyContent: 'center', alignItems: 'center', fontWeight: '700', wordWrap: 'break-word', display: 'flex' }}>
                        {currentDate}
                    </div>
                </div>
                <FontAwesomeIcon icon={faHouse} style={{ color: '#000000', fontSize: 24 }} onClick={() => navigate('/')} />
            </div>
            <div className="border-line0" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '10px', marginBottom: '10px' }}></div>

            <div style={{ width: '390px', height: '220px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 0, color: '#ffffff', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <div className="HeightWeight" style={{ width: 127.08, height: 178, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15, display: 'inline-flex', marginRight: 20 }}>
                    <div className="Frame6" style={{ alignSelf: 'stretch', height: 84, background: '#B1B8C0', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="HeightInfo" style={{ width: 113.60, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 33.98, textAlign: 'center', color: '#272927', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>키    </div>
                            <div className="HeightBar" style={{ width: 66.60, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                                <div className="Group2" style={{ alignSelf: 'stretch', height: 22, position: 'relative' }}>
                                    <div className="Rectangle12" style={{ width: 1.36, height: 10, left: 0, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.28)', borderRadius: 25 }} />
                                    <div className="Rectangle13" style={{ width: 1.36, height: 10, left: 8.16, top: 0, position: 'absolute', background: 'rgba(40.37, 40.37, 40.37, 0.40)', borderRadius: 25 }} />
                                    <div className="Rectangle14" style={{ width: 1.36, height: 10, left: 16.31, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.70)', borderRadius: 25 }} />
                                    <div className="Rectangle15" style={{ width: 1.36, height: 22, left: 24.47, top: 0, position: 'absolute', background: '#D16564', borderRadius: 25 }} />
                                    <div className="Rectangle16" style={{ width: 1.36, height: 10, left: 32.62, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle17" style={{ width: 1.36, height: 10, left: 40.78, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle18" style={{ width: 1.36, height: 10, left: 48.93, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle19" style={{ width: 1.36, height: 10, left: 57.09, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.60)', borderRadius: 25 }} />
                                    <div className="Rectangle20" style={{ width: 1.36, height: 10, left: 65.24, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.30)', borderRadius: 25 }} />
                                </div>
                                <div className="Cm" style={{ width: 59, textAlign: 'center', color: '#272927', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>{height ? `${height} cm` : 'Loading...'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="Frame4" style={{ alignSelf: 'stretch', height: 84, background: '#B1B8C0', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="WeightInfo" style={{ width: 113.60, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 43, color: '#272927', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>몸무게</div>
                            <div className="WeightBar" style={{ width: 66.60, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7, display: 'inline-flex' }}>
                                <div className="Group3" style={{ width: 66.60, height: 22, position: 'relative' }}>
                                    <div className="Rectangle12" style={{ width: 1.36, height: 10, left: 0, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.28)', borderRadius: 25 }} />
                                    <div className="Rectangle13" style={{ width: 1.36, height: 10, left: 8.16, top: 0, position: 'absolute', background: 'rgba(40.37, 40.37, 40.37, 0.40)', borderRadius: 25 }} />
                                    <div className="Rectangle14" style={{ width: 1.36, height: 10, left: 16.31, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.70)', borderRadius: 25 }} />
                                    <div className="Rectangle15" style={{ width: 1.36, height: 22, left: 24.47, top: 0, position: 'absolute', background: '#D16564', borderRadius: 25 }} />
                                    <div className="Rectangle16" style={{ width: 1.36, height: 10, left: 32.62, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle17" style={{ width: 1.36, height: 10, left: 40.78, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle18" style={{ width: 1.36, height: 10, left: 48.93, top: 0, position: 'absolute', background: '#282828', borderRadius: 25 }} />
                                    <div className="Rectangle19" style={{ width: 1.36, height: 10, left: 57.09, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.60)', borderRadius: 25 }} />
                                    <div className="Rectangle20" style={{ width: 1.36, height: 10, left: 65.24, top: 0, position: 'absolute', background: 'rgba(40, 40, 40, 0.30)', borderRadius: 25 }} />
                                </div>
                                <div className="Kg" style={{ alignSelf: 'stretch', textAlign: 'center', color: '#272927', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>{weight ? `${weight} kg` : 'Loading...'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Frame7" style={{ width: 192, height: 178, paddingLeft: 10, paddingRight: 10, paddingTop: 17, paddingBottom: 0, background: '#4A4949', borderRadius: 12, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
                    <div className="BmiInfo1" style={{ flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 58, display: 'inline-flex', paddingBottom: 0 }}>
                        <div className="Bmiinfo2" style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex', paddingBottom: 0 }}>
                            <div className="BodyMassIndexBmi" style={{ width: 87, color: 'white', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>Body Mass Index (BMI)</div>
                            <div className="Frame39" style={{ width: 69, height: 40, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <div className="Frame1" style={{ flex: '1 1 0', alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, background: '#D6FFDD', borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
                                    <div className="bmiinput" style={{ width: 57, height: 40, textAlign: 'center', color: '#979797', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>
                                        {bmi ? bmi.toFixed(1) : '...'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Group5" style={{ width: 172, height: 46, position: 'relative', marginBottom: '0' }}>
                            <div className="Frame4" style={{ width: 172, height: 14, left: 0, top: 32, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 23, display: 'inline-flex' }}>
                                <div style={{ width: 16, color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>10</div>
                                <div style={{ width: 16, color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>15</div>
                                <div style={{ width: 16, color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>21</div>
                                <div style={{ width: 16, color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>30</div>
                                <div style={{ width: 16, color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>35</div>
                            </div>
                            <div className="Rectangle8" style={{ width: 165.14, height: 14, left: 3, top: 11, position: 'absolute', background: 'linear-gradient(90deg, #B5D4F1 0%, #81E5DB 38%, #E8D284 70%, #E2798E 100%)', borderRadius: 21 }} />
                            <div className="Rectangle9" style={{ width: 4.08, height: 6, left: 86, top: 0, position: 'absolute', background: '#D16564', borderRadius: 19, border: '1px white solid' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-line1" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '20px', marginBottom: '20px' }}></div>
            <div className="Frame41" style={{ color: '#ffffff', backgroundColor: '#ffffff', borderRadius: '10px', width: '390px', height: 193, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 40, display: 'inline-flex' }}>
                <div className="Todaykcal" style={{ marginTop: '20px', marginLeft: '25.5px', alignSelf: 'stretch', height: 68, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 6, display: 'flex' }}>
                    <div style={{ marginLeft: '10px', alignSelf: 'stretch', color: 'black', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word', marginBottom: '5px' }}>오늘의 칼로리</div>
                    <div className="Frame40" style={{ width: 338, height: 33, paddingLeft: 3, paddingRight: 3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                        <div className="KcalBar" style={{ width: 338, height: 33, position: 'relative' }}>
                            <div className="Rectangle11" style={{ width: 338, height: 33, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 10 }}>
                                <div className="Rectangle14" style={{ width: `${totalpercent}%`, height: 33, left: 0, top: 0, position: 'absolute', background: totalkcal >= 0 ? '#A0E495' : '#FA7070', borderRadius: 8 }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Kcal" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 18, display: 'inline-flex' }}>
                    <div className="Group11" style={{ marginLeft: '25.5px', width: 34.67, height: 34.67, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="Ellipse1" style={{ width: 34.67, height: 34.67, background: '#ECEAF8', borderRadius: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="BxsSmile" style={{ width: 21, height: 21, padding: 1.75, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faFaceSmile} style={{ width: '17.5px', height: '17.5px', color: '#979797' }} />
                            </div>
                        </div>
                    </div>
                    <div className="Kcal" style={{ textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>
                        {totalkcal >= 0 ? `${totalkcal} kcal 남았어요` : `${Math.abs(totalkcal)} kcal 더 먹었어요`}
                    </div>
                </div>
            </div>
            <div className="border-line2" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '20px', marginBottom: '15px' }}></div>
            <div className="Eatkcal" style={{ color: '#ffffff', backgroundColor: '#ffffff', borderRadius: '10px', width: 390, height: 110, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }} onClick={() => navigate('/State2')}>
                <div style={{ marginTop: '10px', alignSelf: 'stretch', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '800', marginLeft: '25.5px', wordWrap: 'break-word' }}>섭취한 칼로리    <span style={{ fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>(kcal)</span></div>
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
            <div className="border-line3" style={{ width: '80%', borderTop: '3px solid #F3F4F8', borderRadius: '2px', marginTop: '13px', marginBottom: '13px' }}></div>
            <div className="Consumekcal" style={{ marginBottom: '35px', color: '#ffffff', backgroundColor: '#ffffff', borderRadius: '10px', width: 390, height: 120, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }} onClick={() => navigate('/state3')}>
                <div style={{ marginTop: '10px', marginLeft: '25.5px', alignSelf: 'stretch', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '800', wordWrap: 'break-word' }}>소모한 칼로리    <span style={{ fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>(kcal)</span></div>
                <div className="Consumegraph" style={{ marginLeft: '25.5px', width: 338, height: 33, position: 'relative' }}>
                    <div className="Rectangle11" style={{ width: 338, height: 33, left: 0, top: 0, position: 'absolute', background: '#B5D4F1', borderRadius: 10 }}>
                        <div className="Rectangle12" style={{ width: `${percentBurned}%`, height: '100%', background: '#3D81BE', borderRadius: 10 }} />
                    </div>
                </div>
                <div className="Frame42" style={{ marginLeft: '25.5px', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 121, display: 'inline-flex' }}>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>0</div>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>1500</div>
                    <div className="Kcal" style={{ width: 33, height: 29, color: 'black', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>3000</div>
                </div>
            </div>
        </div>
    );
};
export default State1;
