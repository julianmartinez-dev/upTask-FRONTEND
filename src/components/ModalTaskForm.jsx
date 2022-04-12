import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const ModalTaskForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(''); 
  const [priority, setPriority] = useState('');

  const [alert, setAlert] = useState({})

  const { modalTaskForm, handleModalTask, submitTask,project } = useProjects();
  const { id } = useParams();


  const handleSubmit = async e =>{
      e.preventDefault()
      if([name,description,priority,deliveryDate].includes('')){
          setAlert({ msg: 'Please fill all fields', error: true })     
          setTimeout(() => {
              setAlert({});    
          }, 3000);
          return
      }
        await submitTask({ name, description, priority, deliveryDate, project : id})

        //Reset the form
        setName('');
        setDescription('');
        setDeliveryDate('');
        setPriority('');

  }

  const { msg } = alert;
  return (
    <Transition.Root show={modalTaskForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6 font-bold text-gray-900"
                  >
                    New Task
                  </Dialog.Title>

                  <form action="" className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Task Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Task Name.."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        placeholder="Task Description.."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="delivery"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Delivery Date:
                      </label>
                      <input
                        id="delivery"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="priority"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Priority:
                      </label>
                      <select
                        name="priority"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="block w-full p-2 bg-white border-2 rounded-md mt-2"
                      >
                        <option value="" disabled defaultValue>
                          Select Priority
                        </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <input
                      type="submit"
                      value="Add Task"
                      className="py-2 px-4 uppercase font-bold bg-sky-500 text-white text-center w-full rounded-md hover:cursor-pointer mt-3 hover:bg-sky-600 transition-colors"
                    />
                    {msg && <Alert alert={alert} />}
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTaskForm;
