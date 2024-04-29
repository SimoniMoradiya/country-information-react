import React from 'react';
import CountryInformation from './CountryInformation';
import './CountryInformation.css'

function App() {
  return (
    <div className='container text-center pt-5 country'>
    <div className='overlay'></div>
    <div className="country-main-box">
      <h1 className='pb-3'>Country Information</h1>
      <CountryInformation />
    </div>
    </div>
  );
}

export default App;
