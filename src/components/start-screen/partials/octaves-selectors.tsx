/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNoteContext } from "../../../context";
import { messages } from "../../../texts";
import cn from "classnames";
import type { NoteKey } from "../../../types";

type RenderButtonsProps = {
    noteKey: NoteKey;
};

const RenderButtons = ({ noteKey }: RenderButtonsProps) => {
    const { setOctaves, octaves } = useNoteContext("OctavesSelector.RenderButtons");

    const handleToggleOctave = (octave: number) => {
        setOctaves((prev) => {
            const newData = { ...prev };

            const octaveIndex = newData[noteKey].indexOf(octave);

            if (octaveIndex === -1) {
                newData[noteKey] = [...newData[noteKey], octave];
            } else if (newData[noteKey].length > 1) {
                newData[noteKey] = newData[noteKey].filter((i) => i !== octave);
            }

            return newData;
        });
    };

    return (
        <div
            className={cn(
                "start-screen__octaves-wrapper",
                `start-screen__octaves-wrapper--${noteKey}`,
            )}
        >
            <p className="start-screen__octave-title">
                {messages[`start-screen.octaves.${noteKey}`]}
            </p>
            <div className="start-screen__octave-buttons">
                {Array.from({ length: 4 }, (_, i) => {
                    const octave = i + (noteKey === "treble" ? 3 : 1);

                    return (
                        <button
                            key={octave}
                            className={cn("start-screen__octave-button", {
                                "start-screen__octave-button--active":
                                    octaves[noteKey].includes(octave),
                            })}
                            onClick={() => {
                                handleToggleOctave(octave);
                            }}
                        >
                            {/* @ts-expect-error */}
                            {messages[`start-screen.octaves.${octave}`]}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export const OctavesSelector = () => {
    return (
        <div className="start-screen__octaves">
            <RenderButtons noteKey="treble" />
            <RenderButtons noteKey="bass" />
        </div>
    );
};
