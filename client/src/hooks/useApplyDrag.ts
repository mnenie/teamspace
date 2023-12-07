export default function useApplyDarg() {
  const applyDrag: (arr: any[], dragResult: any) => any[] = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };

  return { applyDrag };
}
