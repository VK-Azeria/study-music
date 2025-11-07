import { Field } from "./components/field/field";
import { NoteContextProvider } from "./context";
import "./app.css";

function App() {
    return (
        <NoteContextProvider>
            <Field />
        </NoteContextProvider>
    );
}

export default App;
