import React, { useState } from 'react';
import axios from 'axios';

const CountryInfo = () => {
  const [countryName, setCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      if (response.data.length > 0) {
        const countryData = response.data[0];
        const formattedData = {
          continent: countryData.region || 'N/A',
          area: countryData.area || 'N/A',
          callingCode: countryData.cca2 || 'N/A',
          borders: countryData.borders || [],
          capital: countryData.capital || 'N/A',
          capitalLatitude: countryData.latlng ? countryData.latlng[0] : 'N/A',
          capitalLongitude: countryData.latlng ? countryData.latlng[1] : 'N/A',
          timeZones: countryData.timezones || [],
          flag: countryData.flags ? countryData.flags.svg : ''
        };
        setCountryInfo(formattedData);
        setError('');
      } else {
        setError('Country not found');
        setCountryInfo(null);
      }
    } catch (error) {
      console.error('Error fetching country information:', error);
      setError('Error fetching country information. Please try again later.');
      setCountryInfo(null);
    }
  };

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (countryName.trim() === '') {
      setError('Please enter a country name');
      setCountryInfo(null);
    } else {
      fetchCountryInfo();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={countryName} onChange={handleInputChange} placeholder="Enter country name" />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {countryInfo && (
        <div className='container pt-3'>
          <h2>{countryName}</h2>
          <p><strong>Continent :</strong> {countryInfo.continent}</p>
          <p><strong>Area : </strong>{countryInfo.area} square kilometers</p>
          <p><strong>Calling Code :</strong> {countryInfo.callingCode}</p>
          <p><strong>Borders : </strong>{countryInfo.borders.join(', ')}</p>
          <p><strong>Capital: </strong>{countryInfo.capital}</p>
          <p><strong>Capital Latitude :</strong> {countryInfo.capitalLatitude}</p>
          <p><strong>Capital Longitude :</strong> {countryInfo.capitalLongitude}</p>
          <p><strong>Time Zones :</strong> {countryInfo.timeZones.join(', ')}</p>
          {countryInfo.flag && <img src={countryInfo.flag} alt={`${countryName} flag`} className='img-fluid'/>}
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
