import { useState } from "react";

export function useRequiredInput(defaultInputValue,defaultDidEditValue, validationFn) {
    const [enteredValues, setEnteredValues] = useState(defaultInputValue);
    const [didEdits, setDidEdits] = useState(defaultDidEditValue);
    const areValuesValid = validationFn(enteredValues, didEdits);
    function handleInputChange(event, identifier){
        setEnteredValues((prev) => ({
            ...prev,
            [identifier] : event.target.value
        }));
        setDidEdits((prev) => ({
            ...prev,
            [identifier]: false
        }));
    }
    function handleInputBlur(identifier){
        setDidEdits((prev) => ({
            ...prev,
            [identifier]: true
        }));
    }

    return {
        values: enteredValues,
        handleInputChange,
        handleInputBlur,
        hasErrors: areValuesValid
    }
}