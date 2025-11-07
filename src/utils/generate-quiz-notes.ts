import type { NoteKey, Note } from "../notes";
import type { VisualNote } from "../types";
import { calculateNotePosition } from "./calculate-note-position";

export const generateQuizNotes = (count: number = 10): VisualNote[] => {
    const notes: VisualNote[] = [];

    for (let i = 0; i < count; i++) {
        const key: NoteKey = Math.random() > 0.5 ? "treble" : "bass";
        const note = Math.floor(Math.random() * 7);
        const octave =
            key === "treble"
                ? Math.floor(Math.random() * 2) + 4
                : Math.floor(Math.random() * 2) + 2;

        const baseNote: Note = { key, note, octave };
        const position = calculateNotePosition(baseNote);

        notes.push({
            ...baseNote,
            position,
            clef: key,
        });
    }

    return notes;
};
