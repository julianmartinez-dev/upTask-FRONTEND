import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        //Headers config
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient('/projects', config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  //Send request to insert a new project
  const submitProject = async (project) => {

    if(project.ID){
      editProject(project);
    }else{
      newProject(project);
    }
      
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      //Headers config
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(`/projects/${project.ID}`, project, config);
      console.log(data)
      //Sync the data with the state
      const projectsUpdated = projects.map( p => p._id === data._id ? data : p)
      setProjects(projectsUpdated);
      setTimeout(() => {
        navigate('/projects');
      }, 3000);
      
    } catch (error) {
      console.log(error)
    }
  }

  const newProject = async (project) =>{
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      //Headers config
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post('/projects', project, config);
      setProjects([...projects, data]);
      setTimeout(() => {
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  //Send request to get a project by id
  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      //Headers config
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally{
       setLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        submitProject,
        getProject,
        project,
        loading
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
