import { useNoteContext } from "../../context";
import { messages } from "../../texts";
import { NoteField } from "./note-field";
import "./quiz-screen.css";
import { RenderAnswerButtons } from "./render-answer-buttons";
import { RenderQuizControlls } from "./render-quiz-controlls";

export const QuizScreen = () => {
    const { quizState } = useNoteContext("QuizScreen");

    const isQuizNotInProgress =
        !quizState.currentNote && (!quizState.showResult || quizState.showResult);

    if (isQuizNotInProgress) {
        return null;
    }

    const infoQuestions = messages["quiz-screen.info.question"]
        .replace("{n}", String(quizState.currentQuestionIndex + 1))
        .replace("{N}", String(quizState.totalQuestions));

    const score = messages["quiz-screen.info.score"].replace("{score}", String(quizState.score));

    return (
        <div className="quiz-screen">
            <div className="quiz-screen__container">
                <div className="quiz-screen__info">
                    <p className="quiz-screen__info-text">{infoQuestions}</p>
                    <p className="quiz-screen__info-text">{score}</p>
                </div>

                <NoteField />

                <div className="quiz-screen__footer">
                    <h3 className="quiz-screen__footer-title">
                        {messages["quiz-screen.footer.note"]}
                    </h3>

                    <RenderAnswerButtons />
                    <RenderQuizControlls />
                </div>
            </div>
        </div>
    );
};
