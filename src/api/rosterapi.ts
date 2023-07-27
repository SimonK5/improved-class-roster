import { ClassSearchQuery } from "@/types";

const URL = 'https://classes.cornell.edu/api/2.0'

function getTextBetweenParentheses(text: string) {
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(text);
    if(matches) {
        return matches[1];
    }
    else {
        return "";
    }
}

/**
 * 
 * @param keyword The name of the variable (ex: roster, subject, classLevels[])
 * @param values The value(s) of the variable
 * @returns A URL segment representing the keyword-value pairs for this specific keyword
 */
function createURLSegment(keyword: string, values: string[]): string{
    let res = "";
    for(const val of values){
        res = res.concat(`${keyword}=${val}&`);
    }

    return res;
}

/**
 * @returns A list of strings representing names of semesters
 */
export async function getRosters() {
    const res = await fetch(`${URL}/config/rosters.json`);
    const json = await res.json();
    const rosters = json.data.rosters;
    return rosters.map((roster: any) => roster.slug);
}

/**
 * @returns A list of JSON objects representing names of subjects.
 */
export async function getSubjects() {
    const res = await fetch(`${URL}/config/subjects.json?roster=FA23`);
    const json = await res.json();
    return json.data.subjects;
}

/**
 * @returns A list of JSON objects representing search results.
 */
export async function getSearchClassResults(input: ClassSearchQuery){
    let url = `${URL}/search/classes.json?`;
    url = url.concat(`roster=${input.semester}&`);
    url = url.concat(`subject=${getTextBetweenParentheses(input.subject)}&`);
    url = url.concat(createURLSegment('classLevels[]', input.classLevels));
    url = url.concat('days-type=all&')
    url = url.concat(createURLSegment('days', input.days))
    console.log("url", url)

    const res = await fetch(url);
    const json = await res.json();
    return json.data;
}