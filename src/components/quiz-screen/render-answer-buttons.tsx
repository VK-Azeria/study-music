import { useNoteContext } from "../../context";
import { existedNotes } from "../../notes";
import cn from "classnames";

export const RenderAnswerButtons = () => {
    const { quizState, submitAnswer, getNoteName } = useNoteContext("RenderAnswerButtons");

    return (
        <div className="quiz-screen__buttons-grid">
            {existedNotes.map((noteName) => (
                <button
                    key={noteName}
                    onClick={() => submitAnswer(noteName)}
                    disabled={quizState.showResult}
                    className={cn(
                        "quiz-screen__answer-button",
                        quizState.showResult && noteName === quizState.userAnswer
                            ? quizState.isCorrect
                                ? "correct"
                                : "incorrect"
                            : "",
                        quizState.showResult &&
                            noteName === getNoteName(quizState.currentNote!.note) &&
                            "correct-answer",
                    )}
                >
                    {noteName}
                </button>
            ))}
        </div>
    );
};
