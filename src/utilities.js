/**
 * Returns toWrap split with newlines inserted at relevant points to avoid exceeding lineLength characters per line.
 * Attempts to break between words but will split using hyphens if necessary.
 * 
 * @param {string} toWrap the string to wrap
 * @param {number} lineLength the maximum number of characters per line
 */
export function wrapString(toWrap, lineLength) {
    const words = toWrap.split(" ");
    let wrapped = "";
    let currentLineLength = 0;

    words.forEach(word => {
        let remainingLength = lineLength - currentLineLength;
        if (word.length >= remainingLength && word.length <= lineLength || word.length > lineLength && remainingLength < 3) {
            wrapped = wrapped.concat("\n");
            currentLineLength = 0;
            remainingLength = lineLength - currentLineLength;
        }

        if (word.length > lineLength) {
            let first = "";
            let second = "";

            if (currentLineLength === 0) {
                first = word.slice(0, remainingLength - 1);
                second = word.slice(remainingLength - 1, word.length);
            } else {
                first = word.slice(0, remainingLength - 2);
                second = word.slice(remainingLength - 2, word.length);
                wrapped = wrapped.concat(" ");
            }
            let elements = [];
            let offset = 0;

            while (offset < second.length) {
                if (second.length - offset > lineLength) {
                    elements.push(second.substring(offset, offset + lineLength - 1));
                    offset += lineLength - 1;
                } else {
                    elements.push(second.substring(offset));
                    offset += lineLength;
                }
            }

            wrapped = wrapped.concat(first, "-\n", elements.join("-\n"));
            currentLineLength = elements[elements.length - 1].length;
        } else {
            if (currentLineLength === 0) {
                wrapped = wrapped.concat(word);
                currentLineLength += word.length;
            } else {
                wrapped = wrapped.concat(" ", word);
                currentLineLength += word.length + 1;
            }
        }
    })

    return wrapped;
}

/**
 * Prints the provided string, breaking it where necessary to ensure it does not exceed maxLength characters per line.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logWrapped(toPrint, lineLength) {
    console.log(wrapString(toPrint, lineLength));
}

/**
 * Prints the provided string surrounded by separators.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logSeparated(toPrint, lineLength) {
    console.log("=".repeat(lineLength));
    logWrapped(toPrint, lineLength);
    console.log("=".repeat(lineLength));
}

/**
 * Returns true if the string complies with DD/MM/YYYY date formatting and is a valid date. Returns false otherwise.
 * 
 * @param {string} date the date to validate
 */
// export function isValidDateString(date) {
//     const dayString = date.substring(0, 2);
//     const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // assume 29 days in February for simplicity
//     const segments = date.split("/"); // split the date into the three segments (i.e. DD, MM, YYYY)

//     if (segments.length !== 3) return false; // if there are too few or too many segments something is wrong
//     if (segments[0].length !== 2 || segments[1].length !== 2 || segments[2].length !== 4) return false; // if there are too few or too many digits in each segment somthing is wrong
    
//     let numbers = [1];

//     for (let i = 0; i < 3; i++) {
//         numbers[i] = Number(segments[i]); // convert each of the segments into a number
//         if (isNaN(numbers[i])) return false; // if the result isn't a number something is wrong
//     }

//     // if there are too many days, too many months or any of the numbers are <= 0 something is wrong
//     if (numbers[1] <= 0 || numbers[1] > 12 || numbers[0] <= 0 || numbers[0] > daysInMonths[numbers[1] - 1] || numbers[2] <= 0) return false;

//     return true; // date is valid
// }

/* 
Updated isValidDateString function:
This function is a more robust implementation of the date validation logic, addressing several shortcomings of the original function:
1. Leap Year Handling: It correctly checks for leap years, ensuring that February has 29 days when appropriate.
2. Input Validation: It includes more comprehensive checks for empty, null, or malformed input. 
3. Day Validation Logic: It properly handles the day validation by considering both the month length and leap years, rather than assuming a fixed number of days in February.
4. Comprehensive: It is more comprehensive, handling edge cases better and accounting for leap years, making it a more reliable solution.
*/

export function isValidDateString(date) {
    // Null/undefined/empty check
    if (typeof date !== 'string' || !date.trim()) return false;

    const segments = date.split("/"); // DD/MM/YYYY

    if (segments.length !== 3) return false;

    // Ensure strict format: DD/MM/YYYY
    if (segments[0].length !== 2 || segments[1].length !== 2 || segments[2].length !== 4) return false;

    const [dayStr, monthStr, yearStr] = segments;
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day <= 0 || month <= 0 || year <= 0 ||
        month > 12
    ) {
        return false;
    }

    // Handle February and leap year logic
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (day > (isLeap ? 29 : 28)) return false;
    } else {
        const daysInMonths = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > daysInMonths[month - 1]) return false;
    }

    return true;
}


/**
 * Generates a random flight ID based on the airline name provided.
 * 
 * @param {string} airline the airline running the flight
 * @returns a 5 character alpha-numeric string representing the flight ID
 */

export function generateFlightId(airline) {
    if (typeof airline !== 'string' || airline.trim().length < 2) {
        return undefined;
    }

    let digits = [];
    for (let i = 0; i < 3; i++) {
        digits[i] = Math.round(Math.random() * 9);
    }

    return airline.trim().substring(0, 2).toUpperCase() +
           digits.map(d => d.toString()).join('');
}
