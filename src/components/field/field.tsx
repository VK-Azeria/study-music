import { Lines } from "../../icons/lines";
import { Buttons } from "../buttons/buttons";
import { NoteKey } from "../note-key/note-key";
import "./field.css";

export const Field = () => {
    return (
        <div className="field">
            <div className="field__image">
                <div className="field__lines">
                    <Lines />
                </div>

                <NoteKey />
            </div>

            <Buttons />
        </div>
    );
};
