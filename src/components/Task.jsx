import { formatDate } from "../helpers/formatDate.js";
import useProjects from "../hooks/useProjects.jsx";
import useAdmin from "../hooks/useAdmin.jsx";

const Task = ({ task }) => {
  const { name, description, _id, priority, deliveryDate, status } = task;

  const { handleModalTaskEdit, handleModalDeleteTask, completeTask } =
    useProjects();
  const admin = useAdmin();

  return (
    <div className="border-b p-5 md:flex justify-between items-center">
      <div>
        <p className="mb-2 text-xl font-bold">{name}</p>
        <p className="mb-2 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-2 ">{formatDate(deliveryDate)}</p>
        <p className="mb-2 text-gray-600 uppercase">
          Priority:{' '}
          <span
            className={`${
              priority === 'Low'
                ? 'text-sky-600'
                : priority === 'Medium'
                ? 'text-green-600'
                : 'text-red-600'
            } font-bold`}
          >
            {priority}
          </span>
        </p>
      </div>

      <div className="flex mt-4 md:mt-0 md:flex-col gap-2 flex-wrap">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white"
            onClick={() => handleModalTaskEdit(task)}
          >
            Edit
          </button>
        )}

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white"
            onClick={() => handleModalDeleteTask(task)}
          >
            Delete
          </button>
        )}

        <button
          className={`${
            status ? 'bg-green-600' : 'bg-gray-600'
          } px-4 py-3 font-bold uppercase text-sm rounded-lg text-white`}
          onClick={() => completeTask(_id)}
        >
          {status ? 'Mark as incomplete' : 'Mark as complete'}
        </button>
      </div>
    </div>
  );
};

export default Task;
