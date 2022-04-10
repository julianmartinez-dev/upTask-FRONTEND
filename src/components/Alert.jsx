const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error
          ? 'from-red-400 to-red-600'
          : 'from-sky-500 to-sky-800'
      } bg-gradient-to-tr text-center p-3 rounded uppercase text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
