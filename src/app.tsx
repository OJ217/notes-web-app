import { BrowserRouter, Route, Routes } from 'react-router';

import queryClient from '@/config/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import RootView from '@/views/root/root';

import LogInView from '@/views/auth/log-in';
import SignUpView from '@/views/auth/sign-up';
import VerifyEmailView from '@/views/auth/verify-email';

import NotesView from '@/views/notes/notes';
import CreateNoteView from '@/views/notes/create-note';
import EditNoteView from '@/views/notes/edit-note';

import ArchivesView from '@/views/archives/archives';
import EditArchiveView from '@/views/archives/edit-archive';

import TagsView from '@/views/tags/tags';
import TaggedNotesView from '@/views/tags/tagged-notes';

import SearchView from '@/views/search/search';

import SettingsView from '@/views/settings/settings';
import ColorThemeView from '@/views/settings/color-theme';
import FontThemeView from '@/views/settings/font-theme';
import ChangePasswordView from '@/views/settings/change-password';

import AuthLayout from '@/components/layout/auth-layout';
import MainLayout from '@/components/layout/main-layout';
import NotesLayout from '@/components/layout/notes-layout';
import ArchivesLayout from '@/components/layout/archives-layout';
import TagsLayout from '@/components/layout/tags-layout';
import SearchLayout from '@/components/layout/search-layout';
import SettingsLayout from '@/components/layout/settings-layout';

import { Toaster } from '@/components/ui/toast';
import ThemeLoader from '@/components/hoc/theme-loader';

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
							<Route path='notes' element={<NotesLayout />}>
								<Route index element={<NotesView />} />
								<Route path='new' element={<CreateNoteView />} />
								<Route path=':id' element={<EditNoteView />} />
							</Route>

							<Route path='archives' element={<ArchivesLayout />}>
								<Route index element={<ArchivesView />} />
								<Route path=':id' element={<EditArchiveView />} />
							</Route>

							<Route path='tags' element={<TagsLayout />}>
								<Route index element={<TagsView />} />
								<Route path=':tag' element={<TaggedNotesView />} />
								<Route path=':tag/:id' element={<EditNoteView />} />
							</Route>

							<Route path='search' element={<SearchLayout />}>
								<Route index element={<SearchView />} />
								<Route path=':id' element={<EditNoteView />} />
							</Route>

							<Route path='settings' element={<SettingsLayout />}>
								<Route index element={<SettingsView />} />
								<Route path='color-theme' element={<ColorThemeView />} />
								<Route path='font-theme' element={<FontThemeView />} />
								<Route path='change-password' element={<ChangePasswordView />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
				<Toaster />
			</ThemeLoader>
			<ReactQueryDevtools client={queryClient} initialIsOpen={false} />
		</QueryClientProvider>
	);
}
