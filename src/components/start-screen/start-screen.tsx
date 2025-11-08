import { useCallback, useState, type ReactNode } from "react";
import { useNoteContext } from "../../context";
import { messages } from "../../texts";
import "./start-screen.css";
import { PredefinedButtons } from "./partials/predefined-buttons";
import cn from "classnames";
import { OctavesSelector } from "./partials/octaves-selectors";

type ContainerProps = { children: ReactNode };

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="start-screen">
            <div className="start-screen__container">{children}</div>
        </div>
    );
};

export const StartScreen = () => {
    const { quizState, startQuiz, resetQuiz } = useNoteContext("StartScreen");

    const [questionsCount, setQuestionsCount] = useState(5);

    const isQuizNotStarted = !quizState.currentNote && !quizState.showResult;

    const handleStartQuiz = useCallback(() => {
        startQuiz(questionsCount);
    }, [questionsCount, startQuiz]);

    if (isQuizNotStarted) {
        return (
            <Container>
                <h1 className="start-screen__title">{messages["start-screen.title"]}</h1>
                <label htmlFor="q-count" className="start-screen__q-count">
                    {messages["start-screen.questions-count"]}
                    <input
                        type="number"
                        id="q-count"
                        className="start-screen__q-count-input"
                        value={questionsCount}
                        min={1}
                        onChange={(v) =>
                            setQuestionsCount(Number((v.target as HTMLInputElement).value))
                        }
                    />
                    <div className="start-screen__q-count-predefined">
                        <PredefinedButtons setQuestionsCount={setQuestionsCount} />
                    </div>
                </label>
                <OctavesSelector />
                <button className="start-screen__start-button" onClick={handleStartQuiz}>
                    {messages["start-screen.start"]}
                </button>
            </Container>
        );
    }

    const isQuizFinished = quizState.showResult && !quizState.currentNote;

    if (isQuizFinished) {
        const result = messages["start-screen.result"]
            .replace("{n}", String(quizState.score))
            .replace("{N}", String(quizState.totalQuestions));

        return (
            <Container>
                <h1 className="start-screen__title">{messages["start-screen.completed"]}</h1>
                <p>{result}</p>
                <div className="start-screen__buttons-wrapper">
                    <button
                        className={cn(
                            "start-screen__start-button",
                            "start-screen__completed-button",
                        )}
                        onClick={() => startQuiz(quizState.totalQuestions)}
                    >
                        {messages["start-screen.restart"]}
                    </button>
                    <button
                        className={cn(
                            "start-screen__start-button",
                            "start-screen__completed-button",
                            "start-screen__home-button",
                        )}
                        onClick={resetQuiz}
                    >
                        {messages["start-screen.to-main-page"]}
                    </button>
                </div>
            </Container>
        );
    }

    return null;
};
