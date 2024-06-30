import StatusBadge from "@/components/StatusBadge";
import prisma from "@/utils/db";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  const tasks = await prisma.task.findMany();
  return (
    <div>
      <h1 className="text-4xl font-semibold">Welcome to my tasks list</h1>
      <div className="flex items-center justify-end mb-20">
        <Link
          href="/task/add"
          className="rounded-sm p-3 bg-cyan-300 hover:bg-cyan-400 text-black font-semibold transition-colors"
        >
          Add task
        </Link>
        {/* <a href="/add" className="rounded-md p-3 bg-cyan-300 hover:bg-cyan-400 text-black font-semibold transition-colors">
          Add task
        </a> */}
      </div>
      <table className="table w-full text-left mt-5">
        <thead className="border-t-2 border-b-2 border-gray-300 text-xl">
          <tr>
            <th className="p-3">#</th>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="border-b border-gray-500">
              <td className="p-3">{index + 1}</td>
              <td>{task.title}</td>
              <td>
                <StatusBadge status={task.status} />
              </td>
              <td>
                <Link
                  href={`/task/${task.id}`}
                  className="bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-md p-2"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
