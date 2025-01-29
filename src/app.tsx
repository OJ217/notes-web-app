import { BrowserRouter, Route, Routes } from 'react-router';

import queryClient from '@/config/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

import RootView from '@/views/root/root';

import LogInView from '@/views/auth/log-in';
import SignUpView from '@/views/auth/sign-up';
import VerifyEmailView from '@/views/auth/verify-email';

import NotesView from '@/views/notes/notes';
import CreateNoteView from '@/views/notes/create-note';

import { Toaster } from '@/components/ui/toast';
import AuthLayout from '@/components/layout/auth-layout';
import MainLayout from '@/components/layout/main-layout';

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route index path='/' element={<RootView />} />

					<Route element={<AuthLayout />}>
						<Route path='/log-in' element={<LogInView />} />
						<Route path='/sign-up' element={<SignUpView />} />
						<Route path='/verify-email' element={<VerifyEmailView />} />
					</Route>

					<Route element={<MainLayout />}>
						<Route path='/notes' element={<NotesView />} />
						<Route path='/notes/new' element={<CreateNoteView />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</QueryClientProvider>
	);
}
