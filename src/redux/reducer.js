const intialValues = {
  email: "",
  name: "",
  password: "",
};

export function reducer(state = intialValues, action) {
  switch (action.type) {
    case "SAVE_FORM":
      return { ...action.values };
    default:
      return state;
  }
}
