'use client'
import { LiveSearch } from "./LiveSearch";
import OptionToggle from "./OptionToggle";
import { useState } from "react";
import { Stack, Button, Tooltip } from "@mui/material";
import { getSearchClassResults, storeData, getTextBetweenParentheses } from "@/api/rosterapi";

type Props = {
  semesters: string[]
  subjects: string[]
}





export default function ClassSearch({ semesters, subjects }: Props){
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [levels, setLevels] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const [res, setRes] = useState<any>({});
  console.log(searchResults)


  const searchScraper = async () => {
    console.log("web scraped result")
  }

  const search = async (): Promise<any> => {
    console.log("searching")
    const res = await getSearchClassResults({
      semester: semester,
      subject: subject,
      classLevels: levels,
      days: days
    });

    setSearchResults(res);
  }

  const searchDisabled = !semester || !subject;

  return (
    <div>
      <LiveSearch list={semesters.reverse()} label="Semester" onChange={(e: any, val: string) => setSemester(val)} multiple={false} />
      <LiveSearch list={subjects} label="Subjects" onChange={(e: any, val: string) => setSubject(getTextBetweenParentheses(val))} multiple={false} />
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <OptionToggle options={['M', 'T', 'W', 'R', 'F', 'S', 'Su']} onChange={(e: any, val: string[]) => setDays(val)} exclusive={false}/>
        <OptionToggle  options={['1000', '2000', '3000', '4000', '5000']} onChange={(e: any, val: string[]) => setLevels(val)} exclusive={false}/>
        <Tooltip title="Empty Semester and/or Subject" disableHoverListener={!searchDisabled}>
          <span>
            <Button disabled={searchDisabled} onClick={search} variant="outlined" className="content-center" style={searchDisabled ? { pointerEvents: 'none' } : {}}>
              Search
            </Button>
          </span>
        </Tooltip>

        
      </Stack>
      {
        searchResults.keys ? searchResults.map((course: any) => (
          <p key={course.catalogNbr}>{course.titleLong}</p>
        )) : ""
      }
      <ul className="my-auto">
        {res?.map((country: any) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </div>
  )
  
}