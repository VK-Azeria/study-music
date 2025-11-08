import type { Note, NotePosition } from "../types";

export const calculateNotePosition = (note: Note): NotePosition => {
    if (note.key === "treble") {
        // Скрипичный ключ:
        // - Базовая нота: "соль" 1-й октавы (G4) на 2-й линии (note=4)
        // - "до" 1-й октавы (C4) = под первой дополнительной линией снизу

        // Смещение от "до" 1-й октавы (C4)
        const notesFromC4 = (note.octave - 4) * 7 + note.note;
        console.log("notesFromC4", notesFromC4);

        // C4 = 0, D4 = 1, E4 = 2, F4 = 3, G4 = 4, A4 = 5, B4 = 6
        // C5 = 7, D5 = 8, etc.

        // Позиция: C4 = 2 (под первой линией), каждая нота = +0.5 линии
        const line = notesFromC4 * 0.5;
        console.log("line", line);

        return {
            line: Math.round(line * 2) / 2,
            isOnLine: Math.round(line) === line,
        };
    } else {
        // Басовый ключ:
        // - Базовая нота: "фа" малой октавы (F3) на 4-й линии (note=3)
        // - "до" малой октавы (C3) = под пятой линией

        // Смещение от "до" малой октавы (C3)
        const notesFromC3 = (note.octave - 3) * 7 + note.note;
        console.log("notesFromC3", notesFromC3);
        // C3 = 0, D3 = 1, E3 = 2, F3 = 3, G3 = 4, A3 = 5, B3 = 6
        // C4 = 7, D4 = 8, etc.

        // Позиция: C3 = -2 (под пятой линией), каждая нота = +0.5 линии
        const line = notesFromC3 * 0.5;
        console.log("line", line);

        return {
            line: Math.round(line * 2) / 2,
            isOnLine: Math.round(line) === line,
        };
    }
};
