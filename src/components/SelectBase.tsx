{/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

import { subjects } from "../constants/constants.json"

export function SelectBase(){
  return (
    <div>
      <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
        Class
      </label>

      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="">Please select</option>
        {
          subjects.map((subject, index) => {
            return <option value={subject} key={index}>{subject}</option>
          })
        }
      </select>
    </div>
  )
}

