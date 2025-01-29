import { ApiResponse, Note } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

export type CreateNoteFormValues = {
	title: string;
	content: string;
	tags?: string[] | undefined;
};

export const useCreateNoteMutation = () => {
	const createNote = async (note: CreateNoteFormValues) => {
		return (
			await axios.post<ApiResponse<Note>>('/notes', note, {
				withAuthorization: true,
			})
		).data.data;
	};

	return useMutation({
		mutationFn: createNote,
	});
};
