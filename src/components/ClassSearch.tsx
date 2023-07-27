'use client'
import { LiveSearch } from "./LiveSearch";
import OptionToggle from "./OptionToggle";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { getSearchClassResults } from "@/api/rosterapi";

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
  return (
    <div>
      <LiveSearch list={semesters.reverse()} label="Semester" onChange={(e: any, val: string) => setSemester(val)} multiple={false} />
      <LiveSearch list={subjects} label="Subjects" onChange={(e: any, val: string) => setSubject(val)} multiple={false} />
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <OptionToggle options={['M', 'T', 'W', 'R', 'F', 'S', 'Su']} onChange={(e: any, val: string[]) => setDays(val)}/>
        <OptionToggle  options={['1000', '2000', '3000', '4000', '5000']} onChange={(e: any, val: string[]) => setLevels(val)}/>
        <Button onClick={search} variant="outlined" className="content-center">Search</Button>
      </Stack>
      {
        searchResults?.classes ? searchResults.classes.map((course: any) => (
          <p key={course.catalogNbr}>{course.titleLong}</p>
        )) : ""
      }
    </div>
  )
  
}