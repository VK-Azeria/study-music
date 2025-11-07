import { useNoteContext } from "../context";
import { existedNotes } from "../notes";
import type { VisualNote } from "../types";
import "./staff-with-quiz.css";

const renderNoteOnStaff = (note: VisualNote) => {
    const noteStyle = {
        top: `${50 - note.position.line * 10}%`,
        left: "50%",
        transform: "translateX(-50%)",
    };

    return (
        <div
            className={`note ${note.position.isOnLine ? "on-line" : "between-lines"}`}
            style={noteStyle}
        >
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

export function StaffWithQuiz() {
    const { quizState, submitAnswer, nextQuestion, getNoteName } = useNoteContext("StaffWithQuiz");

    const isQuizNotInProgress =
        (!quizState.currentNote && !quizState.showResult) ||
        (quizState.showResult && !quizState.currentNote);

    if (isQuizNotInProgress) {
        return null;
    }

    return (
        <div className="music-quiz">
            <div className="quiz-info">
                <p>
                    Вопрос {quizState.currentQuestionIndex + 1} из {quizState.totalQuestions}
                </p>
                <p>Счет: {quizState.score}</p>
                <p>Ключ: {quizState.currentNote?.key === "treble" ? "Скрипичный" : "Басовый"}</p>
            </div>

            <div className="staff-container">
                <div className={`staff ${quizState.currentNote?.key || "treble"}`}>
                    <div className={`clef ${quizState.currentNote?.key || "treble"}`}>
                        {quizState.currentNote?.key === "treble" ? "𝄞" : "𝄢"}
                    </div>

                    {[0, 1, 2, 3, 4].map((line) => (
                        <div
                            key={line}
                            className="staff-line"
                            style={{ top: `${50 - line * 10}%` }}
                        />
                    ))}

                    {quizState.currentNote && renderLedgerLines(quizState.currentNote)}
                    {quizState.currentNote && renderNoteOnStaff(quizState.currentNote)}
                </div>
            </div>

            <div className="answer-buttons">
                <h3>Какая это нота?</h3>
                <div className="buttons-grid">
                    {existedNotes.map((noteName) => (
                        <button
                            key={noteName}
                            onClick={() => submitAnswer(noteName)}
                            disabled={quizState.showResult}
                            className={`
                                answer-btn 
                                ${
                                    quizState.showResult && noteName === quizState.userAnswer
                                        ? quizState.isCorrect
                                            ? "correct"
                                            : "incorrect"
                                        : ""
                                }
                                ${
                                    quizState.showResult &&
                                    noteName === getNoteName(quizState.currentNote!.note)
                                        ? "correct-answer"
                                        : ""
                                }
                            `}
                        >
                            {noteName}
                        </button>
                    ))}
                </div>
            </div>

            {quizState.showResult && (
                <div className="quiz-controls">
                    <div className={`result ${quizState.isCorrect ? "success" : "error"}`}>
                        {quizState.isCorrect ? "✅ Правильно!" : "❌ Неправильно!"}
                    </div>
                    <button onClick={nextQuestion} className="next-btn">
                        {quizState.currentQuestionIndex === quizState.totalQuestions - 1
                            ? "Завершить квиз"
                            : "Следующий вопрос →"}
                    </button>
                </div>
            )}
        </div>
    );
}
