export type NotePosition = {
    line: number; // номер линии (может быть дробным для промежуточных позиций)
    isOnLine: boolean; // на линии или между линиями
};

export type VisualNote = Note & {
    position: NotePosition;
};

export type NoteKey = 'treble' | 'bass';

export type Note = {
    note: number;
    octave: number;
    key: NoteKey;
};

export type NoteName = 'до' | 'ре' | 'ми' | 'фа' | 'соль' | 'ля' | 'си';

export type AvailableOctaves = Record<NoteKey, number[]>;
