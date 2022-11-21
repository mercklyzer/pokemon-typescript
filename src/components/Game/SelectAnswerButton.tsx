interface Props {
    answer: string,
    className?: string,
    onClick: (answer:string) => void,
    isCorrect: boolean,
    isGameOver: boolean,
    isAnswersClickable: boolean,
    selectedAnswer: string
}

const SelectAnswerButton:React.FC<Props> = ({answer, className, onClick, isCorrect, isGameOver, isAnswersClickable, selectedAnswer}) => {
    return (
        <button className={`px-4 py-2 rounded-lg bg-gray-200 
            ${!isGameOver && 'hover:bg-green-primary hover:text-white'}
            ${isGameOver || !isAnswersClickable? 'pointer-events-none' : ''}
            ${isGameOver && isCorrect? '!bg-green-primary text-white' : ''}
            ${isCorrect && !isAnswersClickable? '!bg-green-primary text-white' : ''}
            ${isGameOver && selectedAnswer === answer? '!bg-red-300' : ''}
            ${className}`}
            onClick={() => onClick(answer)}
            data-test="answer" data-answer-state={`${isCorrect? 'correct':'wrong'}`}>
                {answer}
        </button>
    );
}

export default SelectAnswerButton;