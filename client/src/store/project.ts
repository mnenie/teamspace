import ProjectService from "@/services/ProjectService";
import type { IProject } from "@/types/Project";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProject = defineStore('project', () => {
  const project = ref({} as IProject)
  const addProject = async () => {
    try{
      const response = await ProjectService.create(project.value)
      project.value = response.data
    }
    catch(err){
      console.log(err)
    }
  }
  return {
    project, addProject
  }
})