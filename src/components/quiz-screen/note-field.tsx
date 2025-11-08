import { useNoteContext } from "../../context";
import type { VisualNote } from "../../types";
import cn from "classnames";

const renderNoteOnStaff = (note: VisualNote) => {
    let bottomPosition = 23;

    if (note.position.line < 0.5) {
        bottomPosition = 21;
    }
    if (note.position.line > 5.5) {
        bottomPosition = 21.5;
    }

    const noteStyle = {
        bottom: `${note.position.line * 8 + bottomPosition}%`,
        left: "50%",
        transform: "translateX(-50%)",
    };

    return (
        <div className="quiz-screen__field-note" style={noteStyle}>
            <div className="quiz-screen__field-note-head"></div>
            {note.position.line < 3 ? (
                <div className="quiz-screen__field-note-stem quiz-screen__field-note-stem--down"></div>
            ) : (
                <div className="quiz-screen__field-note-stem quiz-screen__field-note-stem--up"></div>
            )}
        </div>
    );
};

const renderLedgerLines = (note: VisualNote) => {
    const lines = [];
    const linePosition = note.position.line;

    // Дополнительные линии снизу
    if (linePosition < 0.5) {
        for (let i = 0; i >= Math.floor(linePosition + 0.5); i--) {
            lines.push(
                <div
                    key={`top-${i}`}
                    className="quiz-screen__field-ledger-line quiz-screen__field-ledger-line--bottom"
                    style={{ bottom: `${i * 8 + 25}%` }}
                />,
            );
        }
    }

    // Дополнительные линии сверху
    if (linePosition > 5.5) {
        for (let i = 6; i <= Math.ceil(linePosition); i++) {
            lines.push(
                <div
                    key={`bottom-${i}`}
                    className="quiz-screen__field-ledger-line quiz-screen__field-ledger-line--top"
                    style={{ bottom: `${i * 8 + 25}%` }}
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

                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="quiz-screen__field-line"
                        style={{ bottom: `${index * 8 + 35}%` }}
                    />
                ))}

                {quizState.currentNote && renderLedgerLines(quizState.currentNote)}
                {quizState.currentNote && renderNoteOnStaff(quizState.currentNote)}
            </div>
        </div>
    );
};
