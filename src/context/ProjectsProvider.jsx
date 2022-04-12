import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [task, setTask] = useState({})
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
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
    if (project.ID) {
      editProject(project);
    } else {
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
      const { data } = await axiosClient.put(
        `/projects/${project.ID}`,
        project,
        config
      );

      //Sync the data with the state
      const projectsUpdated = projects.map((p) =>
        p._id === data._id ? data : p
      );
      setProjects(projectsUpdated);

      setTimeout(() => {
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
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
      //Sync the data with the state
      setProjects([...projects, data]);
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
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

      const { data } = await axiosClient.delete(`/projects/${id}`, config);
      alert(data.msg);
      //Sync the data with the state
      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectsUpdated);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    }
  };

  const handleModalTask = () =>{
    setTask({});
    setModalTaskForm(!modalTaskForm);
  }

  //Send request to insert a new task
  const submitTask = async (task) => {

    if(task?.id){
      await editTask(task);
    }else{
      await newTask(task);
    }

    
  }

  const editTask = async (task) => {
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

      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

      //Add task to state
      const projectUpdated = {...project};
      projectUpdated.tasks = projectUpdated.tasks.map ( taskState => taskState._id === data._id ? data : taskState);
      setProject(projectUpdated);
      handleModalTask()
    } catch (error) {
      console.log(error)
    }
  }
  const newTask = async (task) => {
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

      const { data } = await axiosClient.post('/tasks', task, config);
      //Add task to state
      const projectUpdated = { ...project, tasks: [...project.tasks, data] };
      setProject(projectUpdated);
      handleModalTask();
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalTaskEdit = (task) =>{
    setTask(task)
    setModalTaskForm(true)
  }

  const handleModalDeleteTask = (task) =>{
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  }

  const deleteTask = async () => {
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

        const { data } = await axiosClient.delete(`/tasks/${task._id}`,config);
        //Add task to state
        const projectUpdated = { ...project };
        projectUpdated.tasks = projectUpdated.tasks.filter ( taskState => taskState._id !== task._id);
        setProject(projectUpdated);
        setModalDeleteTask(false);
        setTask({});
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        modalTaskForm,
        handleModalTask,
        submitTask,
        task,
        handleModalTaskEdit,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
