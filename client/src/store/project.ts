import ProjectService from "@/services/ProjectService";
import type { IProject } from "@/types/Project";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProject = defineStore('project', () => {
  const projects = ref<IProject[]>([])
  const project = ref({} as IProject)
  const addProject = async (projectInfo: IProject) => {
    try{
      const response = await ProjectService.create(projectInfo)
      project.value = response.data
    }
    catch(err){
      console.log(err)
    }
  }

  const getAllProjects = async (ownerId: number) => {
    try{
      const response = await ProjectService.getAll(ownerId)
      projects.value = response.data

    } catch(err){
      console.log(err)
    }
  }


  return {
    project, addProject, projects, getAllProjects
  }
})