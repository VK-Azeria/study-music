import { useNoteContext } from "../../context";
import { messages } from "../../texts";

export const RenderQuizControlls = () => {
    const { quizState, nextQuestion } = useNoteContext("RenderQuizControlls");

    if (!quizState.showResult) {
        return <div className="quiz-controlls--empty" />;
    }

    const buttonText =
        quizState.currentQuestionIndex === quizState.totalQuestions - 1
            ? messages["quiz-screen.footer.controlls.end"]
            : messages["quiz-screen.footer.controlls.next"];

    return (
        <div className="quiz-controlls">
            <button onClick={nextQuestion} className="quiz-controlls__button">
                {buttonText}
            </button>
        </div>
    );
};
