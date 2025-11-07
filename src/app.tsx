import { NoteContextProvider } from "./context";
import "./app.css";
import { StaffWithQuiz } from "./components/staff-with-quiz";
import { StartScreen } from "./components/start-screen/start-screen";
import { QuizScreen } from "./components/quiz-screen/quiz-screen";

function App() {
    return (
        <NoteContextProvider>
            <StartScreen />
            <QuizScreen />
            <StaffWithQuiz />
        </NoteContextProvider>
    );
}

export default App;
