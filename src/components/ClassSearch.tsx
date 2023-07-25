'use client'
import { LiveSearch } from "./LiveSearch";
import { useState } from "react";


type Props = {
  semesters: string[]
  subjects: string[]
}

export default function ClassSearch({ semesters, subjects }: Props){
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");


  return (
    <div>
      <LiveSearch list={semesters.reverse()} label="Semester" onChange={(e: any, val: string) => setSemester(val)} />
      <LiveSearch list={subjects} label="Subject" onChange={(e: any, val: string) => setSubject(val)} />
      <p>Selected Semester: {semester}</p>
      <p>Selected Subject: {subject}</p>
    </div>
  )
  
}