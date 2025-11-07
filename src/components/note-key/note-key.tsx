import type { ReactNode } from "react";
import { useNoteContext } from "../../context";
import { Bass } from "../../icons/bass";
import { Treble } from "../../icons/tremble";
import "./note-key.css";
import cn from "classnames";

const Container = ({ children }: { children: ReactNode }) => {
    const { currentStep } = useNoteContext("NoteKey");

    return (
        <div
            className={cn(
                "note-key__container",
                currentStep?.key && `note-key__container--${currentStep.key}`,
            )}
        >
            {children}
        </div>
    );
};

export const NoteKey = () => {
    const { currentStep } = useNoteContext("NoteKey");

    switch (currentStep?.key) {
        case "treble": {
            return (
                <Container>
                    <Treble />
                </Container>
            );
        }
        case "bass": {
            return (
                <Container>
                    <Bass />
                </Container>
            );
        }
        default: {
            return null;
        }
    }
};
