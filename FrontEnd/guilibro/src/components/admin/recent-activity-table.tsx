import { Check, X } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "Added new book",
    book: "The Great Gatsby",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated book details",
    book: "To Kill a Mockingbird",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: 3,
    user: "Robert Johnson",
    action: "Deleted book",
    book: "The Catcher in the Rye",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "Added new book",
    book: "Pride and Prejudice",
    time: "2 days ago",
    status: "failed",
  },
  {
    id: 5,
    user: "Michael Wilson",
    action: "Updated book details",
    book: "1984",
    time: "3 days ago",
    status: "completed",
  },
]

export default function RecentActivityTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-[#1a1a1a]">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Book
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-b border-gray-800 bg-[#1a1a1a]">
              <td className="px-6 py-4">{activity.user}</td>
              <td className="px-6 py-4">{activity.action}</td>
              <td className="px-6 py-4">{activity.book}</td>
              <td className="px-6 py-4 text-gray-400">{activity.time}</td>
              <td className="px-6 py-4">
                {activity.status === "completed" ? (
                  <span className="flex items-center text-green-500">
                    <Check size={16} className="mr-1" /> Success
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <X size={16} className="mr-1" /> Failed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
