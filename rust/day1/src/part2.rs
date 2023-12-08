use itertools::Itertools;

use crate::custom_error::AocError;

const DIGIT: [&str; 19] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "one", "two", "three", "four", "five", "six",
    "seven", "eight", "nine",
];

fn word_to_digit(word: &str) -> &str {
    match word {
        "one" => "1",
        "two" => "2",
        "three" => "3",
        "four" => "4",
        "five" => "5",
        "six" => "6",
        "seven" => "7",
        "eight" => "8",
        "nine" => "9",
        _ => word,
    }
}

fn line_calibration(line: &str, window_size: usize) -> i32 {
    let mut first = "";
    let mut last = "";

    let mut front_sliding_window = String::new();
    let mut back_sliding_window = String::new();

    let mut front_pointer = line.chars();
    let mut back_pointer = line.chars().rev();

    while first.is_empty() || last.is_empty() {
        let front = front_pointer.next();
        let back = back_pointer.next();

        if front.is_none() && back.is_none() {
            break;
        }

        if front.is_some() && first.is_empty() {
            front_sliding_window.push(front.unwrap());

            let digit_found = DIGIT
                .iter()
                .filter(|&digit| front_sliding_window.contains(digit))
                .at_most_one()
                .unwrap();

            if digit_found.is_some() {
                first = word_to_digit(digit_found.unwrap());
            }

            if front_sliding_window.chars().count() >= window_size {
                front_sliding_window.remove(0);
            }
        }

        if back.is_some() && last.is_empty() {
            back_sliding_window.insert(0, back.unwrap());

            let digit_found = DIGIT
                .iter()
                .filter(|&digit| back_sliding_window.contains(digit))
                .at_most_one()
                .unwrap();

            if digit_found.is_some() {
                last = word_to_digit(digit_found.unwrap());
            }

            if back_sliding_window.chars().count() >= window_size {
                back_sliding_window.pop();
            }
        }
    }

    let result = format!("{}{}", first, last);
    result.parse::<i32>().unwrap_or_default()
}

#[tracing::instrument]
pub fn process(_input: &str) -> miette::Result<String, AocError> {
    let lines: std::str::Split<'_, char> = _input.split('\n');
    let sum: i32 = lines.map(|line| line_calibration(line, 5)).sum();

    Ok(sum.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_process() -> miette::Result<()> {
        let input = include_str!("../test-input2.txt");
        assert_eq!("281", process(input)?);
        Ok(())
    }
}
