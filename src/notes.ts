import type { NoteName, Note } from "./types";

export const existedNotes: NoteName[] = ["до", "ре", "ми", "фа", "соль", "ля", "си"];

export const notesList: Note[] = [];

export const getNoteName = (noteIndex: number): NoteName => {
    return existedNotes[noteIndex];
};
