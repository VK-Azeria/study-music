import type { Note, NoteKey, VisualNote } from "../types";
import { calculateNotePosition } from "./calculate-note-position";

export const generateQuizNotes = (count: number = 10): VisualNote[] => {
    const notes: VisualNote[] = [];

    for (let i = 0; i < count; i++) {
        const key: NoteKey = Math.random() > 0.5 ? "treble" : "bass";

        // Генерируем ноту (0-6)
        const note = Math.floor(Math.random() * 7);

        // Более реалистичные диапазоны октав
        let octave;
        if (key === "treble") {
            // Скрипичный ключ: в основном 4-5 октавы
            octave = Math.floor(Math.random() * 2) + 4;
        } else {
            // Басовый ключ: в основном 2-3 октавы
            octave = Math.floor(Math.random() * 2) + 2;
        }

        const baseNote: Note = { key, note, octave };
        const position = calculateNotePosition(baseNote);

        // Проверяем, что нота в разумном диапазоне
        if (position.line >= -3 && position.line <= 9) {
            notes.push({
                ...baseNote,
                position,
                clef: key,
            });
        } else {
            // Если нота вышла за пределы, генерируем заново
            i--;
        }
    }

    return notes;
};
