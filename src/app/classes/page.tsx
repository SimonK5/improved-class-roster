import { SelectBase } from "../../components/SelectBase"
import { LiveSearch } from "@/components/LiveSearch"

async function search(data: FormData) {
  "use server"
  console.log("test")
}

export default async function ClassesPage() {

  return (
    <div>
      <h1>Subject code</h1>
      {/* <LiveSearch method="subjects" semester="SP23"/> */}
      <form action={search}>
        <input className="flex gap-2 flex-col"
          type="text"
          name="title"
        />
        <button 
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}