import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm = () => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) return alert('Please verify CAPTCHA');

    const startTime = performance.now();
    const res = await fetch('https://your-backend-url/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password, captchaToken }),
    });
    const endTime = performance.now();

    const data = await res.json();
    alert(`${data.message} (Response time: ${(endTime - startTime).toFixed(2)} ms)`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>USER:</label>
      <input type="text" value={user} onChange={e => setUser(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        onChange={(token) => setCaptchaToken(token)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
