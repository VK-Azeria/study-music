import { useNoteContext } from "../../context";

export const QuizScreen = () => {
    const { quizState, submitAnswer, nextQuestion, getNoteName } = useNoteContext("QuizScreen");

    const isQuizNotInProgress =
        !quizState.currentNote && (!quizState.showResult || quizState.showResult);

    if (isQuizNotInProgress) {
        return null;
    }

    return <div></div>;
};
