import { BrowserRouter, Route, Routes } from 'react-router';

import queryClient from '@/config/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

import RootView from '@/views/root/root';

import LogInView from '@/views/auth/log-in';
import SignUpView from '@/views/auth/sign-up';
import VerifyEmailView from '@/views/auth/verify-email';

import NotesView from '@/views/notes/notes';
import CreateNoteView from '@/views/notes/create-note';
import EditNoteView from '@/views/notes/edit-note';

import ArchivesView from '@/views/archives/archives';
import EditArchiveView from '@/views/archives/edit-archive';

import SettingsView from '@/views/settings/settings';
import ColorThemeView from '@/views/settings/color-theme';
import FontThemeView from '@/views/settings/font-theme';

import AuthLayout from '@/components/layout/auth-layout';
import MainLayout from '@/components/layout/main-layout';
import ThemeLoader from '@/components/hoc/theme-loader';

import { Toaster } from '@/components/ui/toast';

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeLoader>
				<BrowserRouter>
					<Routes>
						<Route index path='/' element={<RootView />} />

						<Route element={<AuthLayout />}>
							<Route path='/log-in' element={<LogInView />} />
							<Route path='/sign-up' element={<SignUpView />} />
							<Route path='/verify-email' element={<VerifyEmailView />} />
						</Route>

						<Route element={<MainLayout />}>
							<Route path='notes'>
								<Route index element={<NotesView />} />
								<Route path='new' element={<CreateNoteView />} />
								<Route path=':id' element={<EditNoteView />} />
							</Route>

							<Route path='archives'>
								<Route index element={<ArchivesView />} />
								<Route path=':id' element={<EditArchiveView />} />
							</Route>

							<Route path='settings'>
								<Route index element={<SettingsView />} />
								<Route path='color-theme' element={<ColorThemeView />} />
								<Route path='font-theme' element={<FontThemeView />} />
								<Route path='change-password' element={<SettingsView />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
				<Toaster />
			</ThemeLoader>
		</QueryClientProvider>
	);
}
