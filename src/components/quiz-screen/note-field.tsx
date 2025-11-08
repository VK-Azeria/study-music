import { useNoteContext } from "../../context";
import type { VisualNote } from "../../types";
import cn from "classnames";

const renderNoteOnStaff = (note: VisualNote) => {
    const noteStyle = {
        top: `${50 - note.position.line * 10}%`,
        left: "50%",
        transform: "translateX(-50%)",
    };

    return (
        <div className="quiz-screen__field-note" style={noteStyle}>
            <div className="note-head"></div>
            {note.position.line > 6 && <div className="stem-up"></div>}
            {note.position.line < 0 && <div className="stem-down"></div>}
        </div>
    );
};

const renderLedgerLines = (note: VisualNote) => {
    const lines = [];
    const linePosition = note.position.line;

    if (linePosition > 6) {
        for (let i = 7; i <= Math.ceil(linePosition); i += 2) {
            lines.push(
                <div
                    key={`top-${i}`}
                    className="ledger-line top"
                    style={{ top: `${50 - i * 10}%` }}
                />,
            );
        }
    }

    if (linePosition < 0) {
        for (let i = -1; i >= Math.floor(linePosition); i -= 2) {
            lines.push(
                <div
                    key={`bottom-${i}`}
                    className="ledger-line bottom"
                    style={{ top: `${50 - i * 10}%` }}
                />,
            );
        }
    }

    return lines;
};

export const NoteField = () => {
    const { quizState } = useNoteContext("NoteField");

    return (
        <div className="quiz-screen__field">
            <div className={cn("quiz-screen__field-container")}>
                <div
                    className={cn(
                        "quiz-screen__field-key",
                        `quiz-screen__field-key--${quizState.currentNote?.key}`,
                    )}
                >
                    {quizState.currentNote?.key === "treble" ? "𝄞" : "𝄢"}
                </div>

                {Array.from({ length: 5 }).map((_, line) => (
                    <div
                        key={line}
                        className="quiz-screen__field-line"
                        style={{ top: `${78 - line * 13}%` }}
                    />
                ))}

                {quizState.currentNote && renderLedgerLines(quizState.currentNote)}
                {quizState.currentNote && renderNoteOnStaff(quizState.currentNote)}
            </div>
        </div>
    );
};
