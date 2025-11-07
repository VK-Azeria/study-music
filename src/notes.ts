export type NoteKey = "treble" | "bass";

export type Note = {
    note: number;
    octave: number;
    key: NoteKey;
};

export const existedNotes = ["до", "ре", "ми", "фа", "соль", "ля", "си"] as const;

export const notesList: Note[] = [];
