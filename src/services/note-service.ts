import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { MutateNoteData } from '@/services/schema';
import { ApiResponse, Note, NoteListItem, NoteStatus, PaginatedResponse, ResourceDeletedResponse, ResourceUpdatedResponse } from '@/types';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type NotesPaginationCache = InfiniteData<PaginatedResponse<NoteListItem>>;

const fetchNotes = async (params?: Partial<{ cursor: string; status: NoteStatus; search: string }>) => {
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

export const useNotesSearchQuery = (search?: string) => {
	return useInfiniteQuery({
		queryKey: ['notes', { search }],
		queryFn: async ({ pageParam }) => {
			return await fetchNotes({ cursor: pageParam, search });
		},
		initialPageParam: undefined,
		getNextPageParam,
		enabled: search !== undefined || search !== null,
	});
};

export const useNoteQuery = ({ noteId }: { noteId: string }) => {
	const fetchNote = async () => {
		return (await axios.get<ApiResponse<Note>>(`/notes/${noteId}`, { withAuthorization: true })).data.data;
	};

	const noteQuery = useQuery({
		queryFn: fetchNote,
		queryKey: ['notes', noteId],
	});

	return noteQuery;
};

export const useCreateNoteMutation = () => {
	const createNote = async (note: MutateNoteData) => {
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
					notesPagination.pages[0].docs.unshift(newNote);
					return notesPagination;
				}
			});

			queryClient.setQueryData(['notes', newNote.id], newNote);

			navigate(`/notes/${newNote.id}`);
		},
	});
};

export const useUpdateNoteMutation = () => {
	const updateNote = async ({ noteId, note }: { noteId: string; note: MutateNoteData }) => {
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
			queryClient.setQueryData(['notes', variables.noteId], updatedNote);

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

	const navigate = useNavigate();
	const queryClient = useQueryClient();

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

				queryClient.setQueryData(['notes', noteId], (note?: Note): Note | undefined => {
					if (note !== undefined) {
						return {
							...note,
							status: 'archived',
						};
					}
				});

				toast.success('Note has been archived');

				navigate('/notes', { replace: true });
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

	const navigate = useNavigate();
	const queryClient = useQueryClient();

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

				queryClient.setQueryData(['notes', noteId], (note?: Note): Note | undefined => {
					if (note !== undefined) {
						return {
							...note,
							status: 'active',
						};
					}
				});

				toast.success('Note has been restored');

				navigate('/archives');
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

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteNote,
		onSuccess: (deleteResponse, noteId) => {
			if (deleteResponse.deleted) {
				let queryKey: string;

				queryClient.setQueryData(['notes', noteId], (note?: Note) => {
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

				toast.success('Note has been deleted');

				navigate('/notes', { replace: true });
			}
		},
	});
};
