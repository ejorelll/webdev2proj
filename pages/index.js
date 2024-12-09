import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/weather?city=${city}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>
      Hello, Welcome to Tobias' weather app
      </h1>
      <hr>
      </hr>
      <h1>Select Your City</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
