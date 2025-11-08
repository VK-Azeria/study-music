import type { AvailableOctaves, Note, NoteKey, VisualNote } from "../types";
import { calculateNotePosition } from "./calculate-note-position";

export const generateQuizNotes = (
    count: number = 10,
    octavesRange: AvailableOctaves,
): VisualNote[] => {
    const notes: VisualNote[] = [];

    for (let i = 0; i < count; i++) {
        const key: NoteKey = Math.random() > 0.5 ? "treble" : "bass";

        // Берем только октавы которые есть в нашей карте
        const octaves = octavesRange[key];
        const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];

        const note = Math.floor(Math.random() * 7); // 0-6

        const baseNote: Note = { key, note, octave: randomOctave };
        const position = calculateNotePosition(baseNote);

        notes.push({
            ...baseNote,
            position,
        });
    }

    return notes;
};
