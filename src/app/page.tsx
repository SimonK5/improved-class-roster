import ClassSearch from "@/components/ClassSearch";

async function getRosters() {
  const res = await fetch('https://classes.cornell.edu/api/2.0/config/rosters.json');
  const json = await res.json();
  const rosters = json.data.rosters;
  return rosters.map((roster: any) => roster.slug);
}

async function getSubjects() {
  const res = await fetch('https://classes.cornell.edu/api/2.0/config/subjects.json?roster=FA23');
  const json = await res.json();
  const subjects = json.data.subjects;
  return subjects.map((subjects: any) => subjects.value);
}

export default async function Home() {
  const semesters = await getRosters()
  const subjects = await getSubjects()

  return (
    <div>
      <ClassSearch semesters={semesters.reverse()} subjects={subjects} />
    </div>
  );
}
