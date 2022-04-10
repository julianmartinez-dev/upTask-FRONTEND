import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className=" px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search projects"
          className="rounded-lg mt-5 md:mt-0 w-full md:w-96 block border p-2"
        />

        <div className='flex items-center gap-4 mt-5 md:mt-0'>
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button 
          type="button"
          className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
          >Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
