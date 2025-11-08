import { NoteContextProvider } from './context';
import './app.css';
import { StartScreen } from './components/start-screen/start-screen';
import { QuizScreen } from './components/quiz-screen/quiz-screen';

function App() {
    return (
        <NoteContextProvider>
            <StartScreen />
            <QuizScreen />
        </NoteContextProvider>
    );
}

export default App;
