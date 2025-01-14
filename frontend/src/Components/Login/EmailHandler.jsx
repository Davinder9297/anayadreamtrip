import React, { useState } from 'react';

const EmailHandler = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  
  const handleGoogleLogin = () => {
    console.log('Login with Google clicked!');
    // Handle Google login logic
  };

  return (
    <div className="w-full h-full bg-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>
      <div className="relative">
        <input
          type="email"
          className="peer border-b-2 border-white bg-transparent w-full text-white focus:outline-none focus:border-secondary"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="absolute left-0 -top-4 text-white text-sm peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-focus:-translate-y-6 peer-focus:text-secondary">
          Email Address
        </label>
      </div>
      <button
        onClick={() => onLogin(email)}
        className="mt-6 bg-secondary text-white px-6 py-2 rounded hover:bg-white hover:text-primary transition w-full"
      >
        Next
      </button>
      <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full max-w-sm flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>
    </div>
  );
};

export default EmailHandler;
