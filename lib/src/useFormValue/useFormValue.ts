const useFormValue = (formRef: React.MutableRefObject<HTMLFormElement>) => {
  interface valueType {
    [key: string]: string;
  }
  let value: valueType = {};
  if (typeof formRef.current !== "undefined") {
    const formChildrens = formRef.current.children;
    Object.keys(formChildrens).forEach((index: string) => {
      const AnyElement = formChildrens[parseInt(index)];
      if (AnyElement.tagName === "INPUT") {
        const inputElement = formChildrens[parseInt(index)] as HTMLInputElement;
        if (
          inputElement.type === "text" || "datetime-local" ||
          "color" || "date" || "email" || "month" || "number" ||
          "password" || "tel" || "time" || "url" || "week")
           {
          value[inputElement.name] = inputElement.value;
        }
      }
      if (AnyElement.tagName === "SELECT") {
        const SelectElement = AnyElement as HTMLSelectElement;
        value[SelectElement.name] = SelectElement.value;
       }
    });
  }
  return value;
};

export default useFormValue;
