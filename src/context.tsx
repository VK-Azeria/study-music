import { createContext } from "@radix-ui/react-context";
import { createElement, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { Note } from "./notes";

type Context = {
    currentStep: null | Note;
    setCurrentStep: Dispatch<SetStateAction<null | Note>>;
};

const [_noteProvider, useNoteContext] = createContext<Context>("context");

const NoteContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<null | Note>({
        key: "bass",
        note: 0,
        octave: 1,
    });

    const value: Context = {
        currentStep,
        setCurrentStep,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return createElement(_noteProvider, value, children);
};

// eslint-disable-next-line react-refresh/only-export-components
export { NoteContextProvider, useNoteContext };
