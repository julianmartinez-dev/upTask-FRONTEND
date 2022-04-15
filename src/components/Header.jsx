import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Search from './Search';

const Header = () => {

  const { searcher, handleSearcher } = useProjects();

  return (
    <header className=" md:px-4 py-5 bg-white border-b ">
      <div className="md:flex md:justify-between ">
        <h2 className="text-4xl text-sky-600 font-black text-center border-b border-sky-600 py-2 md:border-none">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-5 md:mt-0 py-5 md:p-0">
          <button
            type="button"
            className="px-4 py-3 font-bold text-sm rounded-md border-2 border-sky-600  uppercase w-2/3 md:w-auto hover:bg-sky-200"
            onClick={handleSearcher}
          >
            Search Project
          </button>
          <Link
            to="/projects"
            className="font-bold uppercase border-2 border-sky-600 px-4 py-3 text-sm rounded-md w-2/3 l text-center md:w-auto hover:bg-sky-200"
          >
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm border-2 border-sky-600 bg-sky-600 p-3 rounded-md uppercase font-bold w-2/3 md:w-auto"
          >
            Logout
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
