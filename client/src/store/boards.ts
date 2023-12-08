import { defineStore } from "pinia";

interface Task {
}

interface Column {
  name: string;
  tasks: Task[];
}

interface Board {
  columns: Column[];
}

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    selectedBoard: 0,
    selectedColumn: 0,
    selectedTask: 0,
    draggedTask: 0,
  }),
  getters: {
    getColumns: (state) => state.boards[state.selectedBoard]?.columns,
    getCurrentBoard: (state) => state.boards[state.selectedBoard],
    getCurrentColumn: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn],
    getTask: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn]?.tasks[
        state.selectedTask
      ],
    getColumnsNames: (state) =>
      state.boards[state.selectedBoard]?.columns.map((c) => c.name),
  },
  actions: {
    changeTaskColumn(index: number): void {
      const currentColumn = this.getCurrentColumn;
      const currentTask = this.getTask;

      if (currentColumn && currentTask) {
        currentColumn.tasks.push(currentTask);
        currentColumn.tasks.splice(this.selectedTask, 1);

        this.selectedColumn = index;
        this.selectedTask = currentColumn.tasks.length - 1;
      }
    },
    saveTaskChanges({ task, column }: { task: Task; column: number }): void {
      const currentColumn = this.getCurrentColumn;

      if (currentColumn) {
        currentColumn.tasks[this.selectedTask] = task;

        if (this.selectedColumn !== column) {
          this.changeTaskColumn(column);
        }
      }
    },
  },
});
