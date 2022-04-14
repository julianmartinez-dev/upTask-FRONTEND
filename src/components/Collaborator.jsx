import useProjects from "../hooks/useProjects";


const Collaborator = ({member}) => {

    const { handleModalDeleteCollaborator, modalDeleteCollaborator } =
      useProjects();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-left">{member.name}</p>
        <p className="text-sm text-gray-500 uppercase">{member.email}</p>
      </div>
      <div>
          <button
            type="button"
            className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-red-600 text-white text-center items-center"
            onClick={() => handleModalDeleteCollaborator(member)}
          >
              delete
          </button>
      </div>
      
    </div>
  );
}

export default Collaborator