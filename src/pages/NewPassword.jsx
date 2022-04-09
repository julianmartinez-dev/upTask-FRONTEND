

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restart password and don't lose your <span className="text-slate-700">projects</span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-lg p-10">
        

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Change password"
          className=" bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

    </>
  );
}

export default NewPassword