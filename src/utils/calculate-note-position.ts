import type { Note } from "../notes";
import type { NotePosition } from "../types";

export const calculateNotePosition = (note: Note): NotePosition => {
    const baseLine = note.key === "treble" ? 4 : 2; // базовая линия для ключа

    // Расчет позиции относительно базовой линии
    // Каждая нота смещает позицию на 0.5 (пол-линии)
    let line = baseLine + note.note * 0.5;

    // Для скрипичного ключа смещаем октаву
    if (note.key === "treble") {
        line += (note.octave - 4) * 3.5;
    } else {
        // Для басового ключа
        line += (note.octave - 2) * 3.5;
    }

    return {
        line: Math.round(line * 2) / 2, // округляем до 0.5
        isOnLine: Math.round(line) === line,
    };
};
