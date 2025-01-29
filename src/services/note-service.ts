import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { MutateNoteData } from '@/services/schema';
import { ApiResponse, Note, ResourceDeletedResponse, ResourceUpdatedResponse } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNotesQuery = () => {
	const fetchNotes = async () => {
		return (
			await axios.get<ApiResponse<Note[]>>('/notes', {
				withAuthorization: true,
			})
		).data.data;
	};

	const notesQuery = useQuery({
		queryFn: fetchNotes,
		queryKey: ['notes'],
	});

	return notesQuery;
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
			queryClient.setQueryData(['notes'], (notes) => {
				console.log(notes);
				return notes;
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
			queryClient.setQueryData(['notes'], (notes?: Note[]) => {
				if (notes !== undefined) {
					return notes.map((note) => (note.id === variables.noteId ? updatedNote : note));
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
				queryClient.setQueryData(['notes'], (notes?: Note[]) => {
					if (notes !== undefined) {
						return notes.filter((note) => note.id !== noteId);
					}
				});

				toast.success('Note has been archived');

				navigate('/notes', { replace: true });
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
				queryClient.setQueryData(['notes'], (notes?: Note[]) => {
					if (notes !== undefined) {
						return notes.filter((note) => note.id !== noteId);
					}
				});

				toast.success('Note has been deleted');

				navigate('/notes', { replace: true });
			}
		},
	});
};
