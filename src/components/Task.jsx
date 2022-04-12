import { formatDate } from "../helpers/formatDate.js";

const Task = ({ task }) => {
  const { name, description, _id, priority, deliveryDate, status } = task;

  return (
    <div className="border-b p-5 md:flex justify-between items-center">
      <div>
        <p className="mb-2 text-xl">{name}</p>
        <p className="mb-2 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-2 text-xl">{formatDate(deliveryDate)}</p>
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
        <button className="bg-indigo-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white">
          Edit
        </button>

        <button className="bg-red-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white">
          Delete
        </button>

        {status ? (
          <button className="bg-sky-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white">
            Complete
          </button>
        ) : (
          <button className="bg-slate-600 px-4 py-3 font-bold uppercase text-sm rounded-lg text-white">
            Incomplete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
