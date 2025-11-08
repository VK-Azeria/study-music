import type { Note, NoteKey, NotePosition } from "../types";

const notePositions: Record<NoteKey, Record<number, Record<number, NotePosition>>> = {
    treble: {
        3: {
            0: {
                line: -3.5,
                isOnLine: false,
            },
            1: {
                line: -3,
                isOnLine: true,
            },
            2: {
                line: -2.5,
                isOnLine: false,
            },
            3: {
                line: -2,
                isOnLine: true,
            },
            4: {
                line: -1.5,
                isOnLine: false,
            },
            5: {
                line: -1,
                isOnLine: true,
            },
            6: {
                line: -0.5,
                isOnLine: false,
            },
        },
        4: {
            0: {
                line: 0,
                isOnLine: true,
            },
            1: {
                line: 0.5,
                isOnLine: false,
            },
            2: {
                line: 1,
                isOnLine: true,
            },
            3: {
                line: 1.5,
                isOnLine: false,
            },
            4: {
                line: 2,
                isOnLine: true,
            },
            5: {
                line: 2.5,
                isOnLine: false,
            },
            6: {
                line: 3,
                isOnLine: true,
            },
        },
        5: {
            0: {
                line: 3.5,
                isOnLine: false,
            },
            1: {
                line: 4,
                isOnLine: true,
            },
            2: {
                line: 4.5,
                isOnLine: false,
            },
            3: {
                line: 5,
                isOnLine: true,
            },
            4: {
                line: 5.5,
                isOnLine: false,
            },
            5: {
                line: 6,
                isOnLine: true,
            },
            6: {
                line: 6.5,
                isOnLine: false,
            },
        },
        6: {
            0: {
                line: 7,
                isOnLine: true,
            },
            1: {
                line: 7.5,
                isOnLine: false,
            },
            2: {
                line: 8,
                isOnLine: true,
            },
            3: {
                line: 8.5,
                isOnLine: false,
            },
            4: {
                line: 9,
                isOnLine: true,
            },
            5: {
                line: 9.5,
                isOnLine: false,
            },
            6: {
                line: 10,
                isOnLine: true,
            },
        },
    },
    bass: {
        1: {
            0: {
                line: -4.5,
                isOnLine: false,
            },
            1: {
                line: -4,
                isOnLine: true,
            },
            2: {
                line: -3.5,
                isOnLine: false,
            },
            3: {
                line: -3,
                isOnLine: true,
            },
            4: {
                line: -2.5,
                isOnLine: false,
            },
            5: {
                line: -2,
                isOnLine: true,
            },
            6: {
                line: -1.5,
                isOnLine: false,
            },
        },
        2: {
            0: {
                line: -1,
                isOnLine: true,
            },
            1: {
                line: -0.5,
                isOnLine: false,
            },
            2: {
                line: 0,
                isOnLine: true,
            },
            3: {
                line: 0.5,
                isOnLine: false,
            },
            4: {
                line: 1,
                isOnLine: true,
            },
            5: {
                line: 1.5,
                isOnLine: false,
            },
            6: {
                line: 2,
                isOnLine: true,
            },
        },
        3: {
            0: {
                line: 2.5,
                isOnLine: false,
            },
            1: {
                line: 3,
                isOnLine: true,
            },
            2: {
                line: 3.5,
                isOnLine: false,
            },
            3: {
                line: 4,
                isOnLine: true,
            },
            4: {
                line: 4.5,
                isOnLine: false,
            },
            5: {
                line: 5,
                isOnLine: true,
            },
            6: {
                line: 5.5,
                isOnLine: false,
            },
        },
        4: {
            0: {
                line: 6,
                isOnLine: true,
            },
            1: {
                line: 6.5,
                isOnLine: false,
            },
            2: {
                line: 7,
                isOnLine: true,
            },
            3: {
                line: 7.5,
                isOnLine: false,
            },
            4: {
                line: 8,
                isOnLine: true,
            },
            5: {
                line: 8.5,
                isOnLine: false,
            },
            6: {
                line: 9,
                isOnLine: true,
            },
        },
    },
};

export const calculateNotePosition = (note: Note): NotePosition => {
    return notePositions[note.key][note.octave][note.note];
};
