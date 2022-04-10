import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom"

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const submitProject = async (project) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            //Headers config
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/projects', project, config);
            setTimeout(() => {
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ProjectsContext.Provider
            value={{
                projects,
                submitProject
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}
export{
    ProjectsProvider
}
export default ProjectsContext;