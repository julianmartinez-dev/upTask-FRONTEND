import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [task, setTask] = useState({})
  const [collaborator, setCollaborator] = useState({})
  const navigate = useNavigate();

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
  useEffect(() => {
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
      setAlert({ msg: error.response.data.msg, error: true });
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

  const handleModalDeleteCollaborator = (member) =>{
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(member);
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

  const submitCollaborator = async (email) => {
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

      const { data } = await axiosClient.post('/projects/members',{email}, config )
      setCollaborator(data)
    } catch (error) {
      setCollaborator({})
      setAlert({ msg: error.response.data.msg, error: true });
    }
  }

  const addCollaborator = async (email) => {
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

      const { data } = await axiosClient.post(`/projects/members/${project._id}`,{email}, config )
      
      setAlert({msg: data.msg, error: false})
      setCollaborator({})
      setTimeout(() => {
        setAlert({})
      }, 2000);
    } catch (error) {
       setAlert({error: true, msg: error.response.data.msg})
       setTimeout(() => {
         setAlert({});
       }, 2000);
    }
  }

  const deleteCollaborator = async () => {
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

      const { data } = await axiosClient.post(`/projects/delete-members/${project._id}`,{id: collaborator._id}, config )
      
      setAlert({msg: data.msg, error: false})
      setCollaborator({})
      const projectUpdated = {...project}
      projectUpdated.members = projectUpdated.members.filter(member => member._id !== collaborator._id)
      setProject(projectUpdated);
      setModalDeleteCollaborator(false);
      setTimeout(() => {
        setAlert({})
      }, 2000);
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        getProjects,
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
        submitCollaborator,
        collaborator,
        addCollaborator,
        alert,
        setAlert,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectsProvider };
export default ProjectsContext;
