import ClassSearch from "@/components/ClassSearch";
import * as api from "../api/rosterapi"
import firebase from "firebase/compat/app";

// import { storeData } from "../api/rosterapi";

export default async function Home() {
  const semesters = await api.getRosters()
  const subjects = await api.getSubjects()
  const subjectNames = subjects.map((obj: any) => `${obj.descrformal} (${obj.value})`)
  
  return (
    <div>
      <ClassSearch semesters={semesters.reverse()} subjects={subjectNames} />
    </div>
  );
}
