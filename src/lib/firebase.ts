import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'notes-app-ec570.firebaseapp.com',
	projectId: 'notes-app-ec570',
	storageBucket: 'notes-app-ec570.firebasestorage.app',
	messagingSenderId: '487468776290',
	appId: '1:487468776290:web:9e86a808bc41c02a7b8a3b',
	measurementId: 'G-F3LW0TFSN7',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
