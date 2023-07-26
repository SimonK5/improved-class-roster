import { ClassSearchQuery } from "@/types";

const URL = 'https://classes.cornell.edu/api/2.0'

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

}