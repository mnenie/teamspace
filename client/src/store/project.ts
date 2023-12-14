import ProjectService from "@/services/ProjectService";
import type { IMember } from "@/types/Member";
import type { IProject } from "@/types/Project";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProject = defineStore('project', () => {
  const projects = ref<IProject[]>([])
  const project = ref({} as IProject)
  const members = ref<IMember[]>();
  const addProject = async (projectInfo: IProject) => {
    try{
      const response = await ProjectService.create(projectInfo)
      projects.value.push(response.data);
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

  const chooseUrProject = (choiceProj: IProject) => {
    project.value = choiceProj
  }

  const getMembers = async (projId : number) => {
    const resp = await ProjectService.getMembers(projId);
    members.value = resp.data;
  }

  return {
    project, addProject, projects, getAllProjects, chooseUrProject,getMembers,members
  }
})