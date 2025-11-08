import { createContext } from '@radix-ui/react-context';
import {
    createElement,
    useCallback,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from 'react';

import type { VisualNote, NoteName, Note, AvailableOctaves } from './types';
import { getNoteName } from './notes';
import { generateQuizNotes } from './utils/generate-quiz-notes';

type QuizState = {
    currentNote: VisualNote | null;
    userAnswer: NoteName | null;
    isCorrect: boolean | null;
    score: number;
    totalQuestions: number;
    currentQuestionIndex: number;
    quizNotes: VisualNote[];
    showResult: boolean;
};

type Context = {
    quizState: QuizState;
    startQuiz: (questionCount?: number) => void;
    octaves: AvailableOctaves;
    setOctaves: Dispatch<SetStateAction<AvailableOctaves>>;
    submitAnswer: (answer: NoteName) => void;
    nextQuestion: () => void;
    resetQuiz: () => void;
    checkAnswer: (userAnswer: NoteName, correctNote: Note) => boolean;
    getNoteName: (noteIndex: number) => NoteName;
    currentStep: Note | null;
    setCurrentStep: Dispatch<SetStateAction<Note | null>>;
};

const [_noteProvider, useNoteContext] = createContext<Context>('context');

const NoteContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<null | Note>(null);
    const [octaves, setOctaves] = useState<AvailableOctaves>({
        treble: [3, 4, 5, 6],
        bass: [1, 2, 3, 4]
    });

    const [quizState, setQuizState] = useState<QuizState>({
        currentNote: null,
        userAnswer: null,
        isCorrect: null,
        score: 0,
        totalQuestions: 0,
        currentQuestionIndex: 0,
        quizNotes: [],
        showResult: false
    });

    const checkAnswer = useCallback(
        (userAnswer: NoteName, correctNote: Note): boolean => {
            const correctNoteName = getNoteName(correctNote.note);
            return userAnswer === correctNoteName;
        },
        []
    );

    const startQuiz = useCallback<Context['startQuiz']>(
        (questionCount = 10) => {
            const quizNotes = generateQuizNotes(questionCount, octaves);
            setQuizState({
                currentNote: quizNotes[0],
                userAnswer: null,
                isCorrect: null,
                score: 0,
                totalQuestions: questionCount,
                currentQuestionIndex: 0,
                quizNotes,
                showResult: false
            });
            setCurrentStep(quizNotes[0]);
        },
        [octaves]
    );

    const submitAnswer = useCallback(
        (answer: NoteName) => {
            if (!quizState.currentNote || quizState.showResult) return;

            const isCorrect = checkAnswer(answer, quizState.currentNote);

            setQuizState((prev) => ({
                ...prev,
                userAnswer: answer,
                isCorrect,
                score: isCorrect ? prev.score + 1 : prev.score,
                showResult: true
            }));
        },
        [quizState.currentNote, quizState.showResult, checkAnswer]
    );

    const nextQuestion = useCallback(() => {
        setQuizState((prev) => {
            const nextIndex = prev.currentQuestionIndex + 1;

            if (nextIndex >= prev.totalQuestions) {
                return {
                    ...prev,
                    showResult: true,
                    currentNote: null
                };
            }

            const nextNote = prev.quizNotes[nextIndex];
            setCurrentStep(nextNote);

            return {
                ...prev,
                currentNote: nextNote,
                userAnswer: null,
                isCorrect: null,
                currentQuestionIndex: nextIndex,
                showResult: false
            };
        });
    }, []);

    const resetQuiz = useCallback(() => {
        setQuizState({
            currentNote: null,
            userAnswer: null,
            isCorrect: null,
            score: 0,
            totalQuestions: 0,
            currentQuestionIndex: 0,
            quizNotes: [],
            showResult: false
        });
        setCurrentStep(null);
    }, []);

    const value: Context = {
        quizState,
        startQuiz,
        submitAnswer,
        nextQuestion,
        resetQuiz,
        checkAnswer,
        getNoteName,
        currentStep,
        setCurrentStep,
        octaves,
        setOctaves
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return createElement(_noteProvider, value, children);
};

// eslint-disable-next-line react-refresh/only-export-components
export { NoteContextProvider, useNoteContext };
