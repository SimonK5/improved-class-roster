import * as api from "../api/rosterapi"
import firebase from "firebase/compat/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// import { storeData } from "../api/rosterapi";

export default async function Home() {
  const semesters = await api.getRosters()
  const subjects = await api.getSubjects()
  const subjectNames = subjects.map((obj: any) => `${obj.descrformal} (${obj.value})`)
  const supabase = createServerComponentClient({ cookies });

    const { data: countries } = await supabase.from("countries").select();

    return (
      <ul className="my-auto">
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
  );
  
  // return (
  //   <div>
  //     {/* <ClassSearch semesters={semesters.reverse()} subjects={subjectNames} /> */}
  //   </div>
  // );
}
