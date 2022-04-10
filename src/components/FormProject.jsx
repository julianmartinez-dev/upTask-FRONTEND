import { useState } from 'react';
import Alert from './Alert';
import useProjects from '../hooks/useProjects';

const FormProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [client, setClient] = useState('');
  const [alert, setAlert] = useState({});

  const { projects, submitProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([name, description, deliveryDate, client].includes('')) {
      setAlert({ msg: 'Please fill all fields', error: true });
      return;
    }
    //Send data to provider
    await submitProject({ name, description, deliveryDate, client });
    setAlert({ msg: 'Project created successfully', error: false });
    setName('');
    setDescription('');
    setDeliveryDate('');
    setClient('');
  };

  const { msg } = alert;
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Project Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border w-full p-2 placeholder-gray-400 rounded-md"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="border w-full p-2 placeholder-gray-400 rounded-md"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="delivery"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Delivery Date
        </label>
        <input
          type="date"
          name="delivery"
          id="delivery"
          className="border w-full p-2 placeholder-gray-400 rounded-md"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="client"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Client
        </label>
        <input
          type="text"
          name="client"
          id="client"
          className="border w-full p-2 placeholder-gray-400 rounded-md"
          placeholder="Client name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Add Project"
        className="bg-sky-600 hover:bg-sky-700 transition-colors hover:cursor-pointer text-white font-bold py-3 px-4 rounded-lg uppercase w-full"
      />

      {msg && <Alert alert={alert} />}
    </form>
  );
};

export default FormProject;
