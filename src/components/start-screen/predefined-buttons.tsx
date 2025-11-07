type Props = {
    setQuestionsCount: (val: number) => void;
};

export const PredefinedButtons = ({ setQuestionsCount }: Props) => {
    return Array.from({ length: 5 }).map((_, index) => {
        const count = (index + 1) * 5;

        return (
            <button
                key={count}
                onClick={() => {
                    setQuestionsCount(count);
                }}
                className="start-screen__q-count-button"
            >
                {count}
            </button>
        );
    });
};
