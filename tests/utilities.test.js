import { generateFlightId, isValidDateString, wrapString } from "../src/utilities";

test("wrapString: wrap single word over two lines", () => {
  expect(wrapString("Long", 3)).toBe("Lo-\nng");
});

test("wrapString: wrap multiple words over two lines", () => {
  expect(wrapString("Too long", 4)).toBe("Too\nlong");
});

test("wrapString: wrap complex sentence", () => {
  expect(wrapString("This is a complex sentence that needs to be wrapped", 6)).toBe("This\nis a\ncompl-\nex se-\nntence\nthat\nneeds\nto be\nwrapp-\ned");
});

test("wrapString: wrap very long words", () => {
  expect(wrapString("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbbb ccccccccccccccccccccccccccc", 6)).toBe(
    `aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa
bbbbb-
bbbbb-
bbbbb-
bbbbb-
bbbbb-
bbb c-
ccccc-
ccccc-
ccccc-
ccccc-
cccccc`
  );
});

// Test for invalid string
test("isValidDateString: invalid string", () => {
  expect(isValidDateString("notavaliddate")).toBe(false);
});

// Test for the wrong amount of "date segments" (see comments in utilities.js for more info)
test("isValidDateString: wrong number of date segments", () => {
  expect(isValidDateString("12/12/2012/20")).toBe(false);
});

// Test for wrong number of digits in the day
test("isValidDateString: wrong number of digits in day", () => {
  expect(isValidDateString("1/12/2012")).toBe(false);
});

// Test for wrong number of digits in the month
test("isValidDateString: wrong number of digits in month", () => {
  expect(isValidDateString("12/1/2012")).toBe(false);
});

// Test for wrong number of digits in the year
test("isValidDateString: wrong number of digits in year", () => {
  expect(isValidDateString("12/12/201")).toBe(false);
});

// Test for day outside of month's number of day's
test("isValidDateString: day greater than permitted", () => {
  expect(isValidDateString("32/81/2812")).toBe(false);
});

// Test for month greater than 12
test("isValidDateString: month greater than 12", () => {
  expect(isValidDateString("12/13/2012")).toBe(false);
});

// Test for day <= 0
test("isValidDateString: day <= 0", () => {
  expect(isValidDateString("00/12/2012")).toBe(false);
});

// Test for month <= 0
test("isValidDateString: month <=0", () => {
  expect(isValidDateString("12/00/2012")).toBe(false);
});

// Test for year <= 0
test("isValidDateString: year <= 0", () => {
  expect(isValidDateString("12/12/0000")).toBe(false);
});

// Test for valid date
test("isValidDateString: valid date", () => {
  expect(isValidDateString("12/12/2012")).toBe(true);
});

///// PUT YOUR TESTS FOR generateFlightId HERE /////

// Test uppercase
test("generateFlightId: is uppercase", () => {
  expect(generateFlightId("Qantas").substring(0, 2)).toBe("QA");
});

// Test lowercase
test("generateFlightId: is lowercase", () => {
  expect(generateFlightId("qantas").substring(0, 2)).toBe("QA");
});

// Test for string with special characters
test("generateFlightId: special characters", () => {
  expect(generateFlightId("Qantas Airways!").substring(0, 2)).toBe("QA");
});

// Test for string with numbers
test("generateFlightId: string with numbers", () => {
  expect(generateFlightId("Qantas123").substring(0, 2)).toBe("QA");
});

// Test for string with spaces
test("generateFlightId: string with spaces", () => {
  expect(generateFlightId("Qantas Airways").substring(0, 2)).toBe("QA");
});

// Test for string with hyphens
test("generateFlightId: string with hyphens", () => {
  expect(generateFlightId("Qantas-Airways").substring(0, 2)).toBe("QA");
});

// Test for string with underscores
test("generateFlightId: string with underscores", () => {
  expect(generateFlightId("Qantas_Airways").substring(0, 2)).toBe("QA");
});

// Test for string with numbers and special characters
test("generateFlightId: string with numbers and special characters", () => {
  expect(generateFlightId("Qantas123!").substring(0, 2)).toBe("QA");
});

// Test for string with numbers and spaces
test("generateFlightId: string with numbers and spaces", () => {
  expect(generateFlightId("Qantas 123").substring(0, 2)).toBe("QA");
});

// Test for string with numbers and hyphens
test("generateFlightId: string with numbers and hyphens", () => {
  expect(generateFlightId("Qantas-123").substring(0, 2)).toBe("QA");
});

// Test for blank string
test("generateFlightId: blank string", () => {
  expect(generateFlightId("")).toBe(undefined);
});

// Test for string of whitespace
test("generateFlightId: whitespace string", () => {
  expect(generateFlightId("   \n")).toBe(undefined);
});

// Test for undefined for empty string
test('should return undefined for empty string', () => {
  const result = generateFlightId('');
  expect(result).toBeUndefined();
});

// Test for undefined for whitespace-only string
test('should return undefined for whitespace-only string', () => {
  const result = generateFlightId('   ');
  expect(result).toBeUndefined();
});

// Test for undefined for single-character input
test('should return undefined for single-character input', () => {
  const result = generateFlightId('A');
  expect(result).toBeUndefined();
});

// Test for ensuring that the first two characters are uppercase
test('should ensure first two characters are uppercase', () => {
  const id = generateFlightId('virgin');
  const prefix = id.substring(0, 2);
  expect(prefix).toBe(prefix.toUpperCase());
});
