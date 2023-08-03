import { ClassSearchQuery } from "@/types";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../firebase/clientApp';

const URL = 'https://classes.cornell.edu/api/2.0'

export function getTextBetweenParentheses(text: string) {
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(text);
    if(matches) {
        return matches[1];
    }
    else {
        return "";
    }
}

function filterByDay(jsonData: any, targetPattern: string) {
    const filteredData = jsonData.map((cls: any) => {
      const filteredEnrollGroups = cls.enrollGroups
        .map((enrollGroup: any) => {
          const filteredClassSections = enrollGroup.classSections
            .map((classSection: any) => {
              const filteredMeetings = classSection.meetings.filter((meeting: any) => {
                return meeting.pattern === targetPattern;
              });
  
              return filteredMeetings.length > 0
                ? { ...classSection, meetings: filteredMeetings }
                : null;
            })
            .filter(Boolean);
  
          return filteredClassSections.length > 0
            ? { ...enrollGroup, classSections: filteredClassSections }
            : null;
        })
        .filter(Boolean);
  
      return filteredEnrollGroups.length > 0
        ? { ...cls, enrollGroups: filteredEnrollGroups }
        : null;
    }).filter(Boolean);
  
    return filteredData;
  }

  function convertDaysOfWeek(daysArray: string[]) {
    const daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'S', 'Su'];
  
    // Sort the daysArray based on their position in daysOfWeek
    const sortedDaysArray = daysArray.sort((a, b) => {
      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    });
  
    // Join the sorted elements into a string
    const resultString = sortedDaysArray.join('');
  
    return resultString;
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

export async function getSearchClassResults(input: ClassSearchQuery){
  const classesRef = collection(db, "roster");
  let q: any = classesRef;

  console.log(input.subject)
  if(input.subject){
    q = query(q, where("subject", "==", `${input.subject}`))
  }
  
  const snapshot = await getDocs(q)
  let res: any[] = []
  snapshot.forEach((doc) => {
    res.push(doc.data());
  });
  if(input.classLevels?.length > 0){
    res = res.filter((item) => input.classLevels.includes((Math.floor(parseInt(item.catalogNbr) / 1000) * 1000).toString()))
  }
  if(input.days?.length > 0){
    res = filterByDay(res, convertDaysOfWeek(input.days))
  }

  console.log(res)

  return res;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const storeData = async () => {
  const subjects = await getSubjects();
  const classes: any[] = [];

  for(let i = 0; i < subjects.length; i++){
    await delay(1200);
    console.log("querying", subjects[i].value);
    console.log("progress", `${100 * i / subjects.length}%`);
    const res = await fetch(`${URL}/search/classes.json?roster=FA23&subject=${subjects[i].value}`)
    const json = await res.json();
    for(let i = 0; i < json.data.classes.length; i++){
      classes.push(json.data.classes[i]);
    }
  }
  console.log("done querying class roster, storing into firebase");
  for(let i = 0; i < classes.length; i++){
    await setDoc(doc(db, "roster", `${classes[i].subject} ${classes[i].catalogNbr}`), classes[i], {"merge": true});
  }
}