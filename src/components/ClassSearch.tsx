'use client'
import { LiveSearch } from "./LiveSearch";
import OptionToggle from "./OptionToggle";
import { useState } from "react";
import { Stack, Button } from "@mui/material";

type Props = {
  semesters: string[]
  subjects: string[]
}


export default function ClassSearch({ semesters, subjects }: Props){
  const [semester, setSemester] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([""]);
  const [levels, setLevels] = useState([""]);
  const [days, setDays] = useState([""]);


  return (
    <div>
      <LiveSearch list={semesters.reverse()} label="Semester" onChange={(e: any, val: string) => setSemester(val)} multiple={false} />
      <LiveSearch list={subjects} label="Subjects" onChange={(e: any, val: string[]) => setSelectedSubjects(val)} multiple={true} />
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <OptionToggle options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} onChange={(e: any, val: string[]) => setDays(val)}/>
        <OptionToggle  options={['1000', '2000', '3000', '4000', '5000']} onChange={(e: any, val: string[]) => setLevels(val)}/>
        <Button variant="outlined" className="content-center">Search</Button>
      </Stack>
    </div>
  )
  
}