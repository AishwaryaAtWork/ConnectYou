/**
 * Custom hook to debounce a value.
 * Returns a debounced version of the input value that only changes after the specified delay.
 * Useful for implementing search boxes or form validation after user stops typing.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - The debounce delay in ms
 * @returns {any} The debounced value
*/
import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue];
};
