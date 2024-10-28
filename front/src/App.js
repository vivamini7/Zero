import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogoScreen from './components/LogoScreen';
import MainScreen from './components/MainScreen';
import ExerciseRecommendation from './components/ExerciseRecommendation';
import ExerciseSelection from './components/ExerciseSelection';
import ResultScreen from './components/ResultScreen';
import State1 from './components/State1';
import State2 from './components/State2';
import State3 from './components/State3';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import MapContainer from './components/map/MapContainer';
import RestaurantRecommendations from './components/map/RestaurantRecommendations';

const AppContent = () => {
 // const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);
  const [showMainScreen, setShowMainScreen] = useState(false);
  const [showExerciseRecommendation, setShowExerciseRecommendation] = useState(false);
  const [showExerciseSelection, setShowExerciseSelection] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      setShowMainScreen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExerciseRecommendation = () => {
    setShowMainScreen(false);
    setShowExerciseRecommendation(true);
  };

  const handleNext = (totalCalories) => {
    setConsumedCalories(totalCalories);
    setShowExerciseRecommendation(false);
    setShowExerciseSelection(true);
  };

  const handleConfirm = (exercises) => {
    setSelectedExercises(exercises);
    setShowExerciseSelection(false);
    setShowResultScreen(true);
  };

  const handleExit = () => {
    setShowResultScreen(false);
    setShowMainScreen(true);
    setConsumedCalories(0);
    setSelectedExercises([]);
  };

  return (
    <>
      {showLogo && <LogoScreen />}
      {showMainScreen && <MainScreen onExerciseRecommendation={handleExerciseRecommendation} />}
      {showExerciseRecommendation && <ExerciseRecommendation onNext={handleNext} />}
      {showExerciseSelection && <ExerciseSelection onConfirm={handleConfirm} consumedCalories={consumedCalories} />}
      {showResultScreen && <ResultScreen consumedCalories={consumedCalories} exercises={selectedExercises} onExit={handleExit} />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/state1" element={<State1 />} />
        <Route path="/state2" element={<State2 />} />
        <Route path="/state3" element={<State3 />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/map" element={<MapContainer />} />
        <Route path="/recommendations" element={<RestaurantRecommendations />} />
      </Routes>
    </Router>
  );
};

export default App;
