import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [userConfirmed, setUserConfirmed] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirm/${id}`;
        console.log(url);
        const { data } = await axios(url);
        setAlert({ msg: data.msg, error: false})
        setUserConfirmed(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true})
      }
    };

    confirmAccount();
  }, []);

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirm Account and start to create your{' '}
        <span className="text-slate-700">projects</span>
      </h1>
      <div>
        {msg && <Alert alert={alert} />}
        {userConfirmed && (
          <Link
            to="/"
            className="text-sky-700 block mb-3 md:mb-0 text-center font-bold border-2 border-sky-800 rounded-lg p-3 hover:text-white hover:bg-sky-800 uppercase transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
