import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './main';

const root = createRoot(document.getElementById('__root'));
root.render(<Example />);