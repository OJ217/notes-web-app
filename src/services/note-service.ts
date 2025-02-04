import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { isNilString } from '@/lib/utils';
import { MutateNoteFormData } from '@/services/schema';
import { ApiResponse, Note, NoteListItem, NoteStatus, PaginatedResponse, ResourceDeletedResponse, ResourceUpdatedResponse } from '@/types';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback, useNavigateBack } from '@/hooks';

type NotesPaginationCache = InfiniteData<PaginatedResponse<NoteListItem>>;

const fetchNotes = async (params?: Partial<{ cursor: string; status: NoteStatus; tag: string; search: string }>) => {
	return (
		await axios.get<ApiResponse<PaginatedResponse<NoteListItem>>>('/notes', {
			withAuthorization: true,
			params,
		})
	).data.data;
};

const getNextPageParam = (paginatedResponse: PaginatedResponse<NoteListItem>) => {
	return paginatedResponse.meta.cursor;
};

export const useNotesQuery = () => {
	return useInfiniteQuery({
		queryKey: ['notes'],
		queryFn: async ({ pageParam }) => {
			return await fetchNotes({ cursor: pageParam, status: 'active' });
		},
		initialPageParam: undefined,
		getNextPageParam,
	});
};

export const useArchivesQuery = () => {
	return useInfiniteQuery({
		queryKey: ['archives'],
		queryFn: async ({ pageParam }) => {
			return await fetchNotes({ cursor: pageParam, status: 'archived' });
		},
		initialPageParam: undefined,
		getNextPageParam,
	});
};

export const useTaggedNotesQuery = (tag?: string) => {
	return useInfiniteQuery({
		queryKey: ['notes.tagged', tag],
		queryFn: async ({ pageParam }) => {
			return await fetchNotes({ cursor: pageParam, tag, status: 'active' });
		},
		initialPageParam: undefined,
		getNextPageParam,
		enabled: !isNilString(tag),
	});
};

export const useSearchNotesQuery = (searchInputValue?: string) => {
	const [searchValue, setSearchValue] = useState('');

	const debouncedSetSearch = useDebouncedCallback((newSearchValue) => {
		setSearchValue(newSearchValue);
	}, 750);

	useEffect(() => {
		if (isNilString(searchInputValue)) {
			setSearchValue('');
		} else {
			debouncedSetSearch(searchInputValue);
		}
	}, [debouncedSetSearch, searchInputValue]);

	return useInfiniteQuery({
		queryKey: ['notes.search', searchValue?.toLowerCase()],
		queryFn: async ({ pageParam }) => {
			return await fetchNotes({ cursor: pageParam, search: searchValue, status: 'active' });
		},
		initialPageParam: undefined,
		getNextPageParam,
		enabled: !isNilString(searchValue), // Only fetch when debounced search is valid
	});
};

export const useNoteQuery = ({ noteId }: { noteId: string }) => {
	const fetchNote = async () => {
		return (await axios.get<ApiResponse<Note>>(`/notes/${noteId}`, { withAuthorization: true })).data.data;
	};

	const noteQuery = useQuery({
		queryFn: fetchNote,
		queryKey: ['note', noteId],
	});

	return noteQuery;
};

export const useCreateNoteMutation = () => {
	const createNote = async (note: MutateNoteFormData) => {
		return (
			await axios.post<ApiResponse<Note>>('/notes', note, {
				withAuthorization: true,
			})
		).data.data;
	};

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createNote,
		onSuccess: (newNote) => {
			queryClient.setQueryData(['notes'], (notesPagination: NotesPaginationCache): NotesPaginationCache | undefined => {
				if (notesPagination !== undefined) {
					const [firstPage, ...rest] = notesPagination.pages;

					return {
						pageParams: notesPagination.pageParams,
						pages: [{ docs: [newNote, ...firstPage.docs], meta: firstPage.meta }, ...rest],
					};
				}
			});

			queryClient.setQueryData(['note', newNote.id], newNote);

			navigate(`/notes/${newNote.id}`, { replace: true, preventScrollReset: true });
		},
	});
};

export const useUpdateNoteMutation = () => {
	const updateNote = async ({ noteId, note }: { noteId: string; note: MutateNoteFormData }) => {
		return (
			await axios.patch<ApiResponse<Note>>(`/notes/${noteId}`, note, {
				withAuthorization: true,
			})
		).data.data;
	};

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateNote,
		onSuccess: (updatedNote, variables) => {
			queryClient.setQueryData(['note', variables.noteId], updatedNote);

			queryClient.setQueryData(['notes'], (notesPagination?: NotesPaginationCache): NotesPaginationCache | undefined => {
				if (notesPagination !== undefined) {
					return {
						pageParams: notesPagination.pageParams,
						pages: notesPagination.pages.map((page) => ({
							docs: page.docs.map((note) => (note.id === variables.noteId ? updatedNote : note)),
							meta: page.meta,
						})),
					};
				}
			});

			queryClient.invalidateQueries({ queryKey: ['notes.tagged'] });
			queryClient.invalidateQueries({ queryKey: ['notes.search'] });
		},
	});
};

export const useArchiveNoteMutation = () => {
	const archiveNote = async (noteId: string) => {
		return (
			await axios.post<ResourceUpdatedResponse>(`/notes/${noteId}/archive`, undefined, {
				withAuthorization: true,
			})
		).data.data;
	};

	const queryClient = useQueryClient();
	const navigateBack = useNavigateBack({ options: { replace: true } });

	return useMutation({
		mutationFn: archiveNote,
		onSuccess: (archiveResponse, noteId) => {
			if (archiveResponse.updated) {
				queryClient.invalidateQueries({ queryKey: ['archives'] });

				queryClient.setQueryData(['notes'], (notesPagination?: NotesPaginationCache): NotesPaginationCache | undefined => {
					if (notesPagination !== undefined) {
						return {
							pageParams: notesPagination.pageParams,
							pages: notesPagination.pages.map((page) => ({
								docs: page.docs.filter((note) => note.id !== noteId),
								meta: page.meta,
							})),
						};
					}
				});

				queryClient.setQueryData(['note', noteId], (note?: Note): Note | undefined => {
					if (note !== undefined) {
						return {
							...note,
							status: 'archived',
						};
					}
				});

				queryClient.invalidateQueries({ queryKey: ['notes.tagged'] });
				queryClient.invalidateQueries({ queryKey: ['notes.search'] });

				toast.success('Note has been archived');

				navigateBack();
			}
		},
	});
};

export const useRestoreNoteMutation = () => {
	const restoreNote = async (noteId: string) => {
		return (
			await axios.post<ResourceUpdatedResponse>(`/notes/${noteId}/restore`, undefined, {
				withAuthorization: true,
			})
		).data.data;
	};

	const queryClient = useQueryClient();
	const navigateBack = useNavigateBack({ options: { replace: true } });

	return useMutation({
		mutationFn: restoreNote,
		onSuccess: (restoreResponse, noteId) => {
			if (restoreResponse.updated) {
				queryClient.invalidateQueries({ queryKey: ['notes'] });

				queryClient.setQueryData(['archives'], (notesPagination?: NotesPaginationCache): NotesPaginationCache | undefined => {
					if (notesPagination !== undefined) {
						return {
							pageParams: notesPagination.pageParams,
							pages: notesPagination.pages.map((page) => ({
								docs: page.docs.filter((note) => note.id !== noteId),
								meta: page.meta,
							})),
						};
					}
				});

				queryClient.setQueryData(['note', noteId], (note?: Note): Note | undefined => {
					if (note !== undefined) {
						return {
							...note,
							status: 'active',
						};
					}
				});

				queryClient.invalidateQueries({ queryKey: ['notes.tagged'] });
				queryClient.invalidateQueries({ queryKey: ['notes.search'] });

				toast.success('Note has been restored');

				navigateBack();
			}
		},
	});
};

export const useDeleteNoteMutation = () => {
	const deleteNote = async (noteId: string) => {
		return (
			await axios.delete<ResourceDeletedResponse>(`/notes/${noteId}`, {
				withAuthorization: true,
			})
		).data.data;
	};

	const queryClient = useQueryClient();
	const navigateBack = useNavigateBack({ options: { replace: true } });

	return useMutation({
		mutationFn: deleteNote,
		onSuccess: (deleteResponse, noteId) => {
			if (deleteResponse.deleted) {
				let queryKey: string;

				queryClient.setQueryData(['note', noteId], (note?: Note) => {
					if (note !== undefined) {
						queryKey = note.status === 'active' ? 'notes' : 'archives';
					}

					return undefined;
				});

				queryClient.setQueryData([queryKey!], (notesPagination?: NotesPaginationCache): NotesPaginationCache | undefined => {
					if (notesPagination !== undefined) {
						return {
							pageParams: notesPagination.pageParams,
							pages: notesPagination.pages.map((page) => ({
								docs: page.docs.filter((note) => note.id !== noteId),
								meta: page.meta,
							})),
						};
					}
				});

				queryClient.invalidateQueries({ queryKey: ['notes.tagged'] });
				queryClient.invalidateQueries({ queryKey: ['notes.search'] });

				toast.success('Note has been deleted');

				navigateBack();
			}
		},
	});
};
