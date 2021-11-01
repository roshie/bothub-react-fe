import './App.css';
import IdToken from './pages/idToken';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYWjzXg1TsC0lXtKQkGeep_IMMl7z_onQ",
  authDomain: "bothub-6a2e3.firebaseapp.com",
  projectId: "bothub-6a2e3",
  storageBucket: "bothub-6a2e3.appspot.com",
  messagingSenderId: "649455413731",
  appId: "1:649455413731:web:c60c68942c6b830c23d8d6",
  measurementId: "G-9TVY77QJ8T"
};


function App() {
  
  initializeApp(firebaseConfig);

  return (
    <>
      <div> BOTHUB </div>
      <IdToken></IdToken>
    </>
  );
}

export default App;
