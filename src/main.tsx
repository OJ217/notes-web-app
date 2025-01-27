import '@/styles/index.css';
import '@/config/axios-config';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
