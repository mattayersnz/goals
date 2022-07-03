import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Auth from './Auth';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <div className="AppContainer">
    <h1 className="Title">Goals 🔥</h1>
    <Auth />
  </div>
);
