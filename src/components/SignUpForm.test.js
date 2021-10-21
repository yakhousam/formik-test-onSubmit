import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "./SignUpForm";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { onSubmit as mockedOnSubmit } from "./onSubmit";

// we mock the entier module "./onSubmit.js" thus onSubmit = jest.fn()
jest.mock("./onSubmit.js");

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("components/SignUpForm", () => {
  test("should submit the form", async () => {
    const email = "email@example.com";
    const name = "Jhon";
    const password = "secret";
    render(<SignUpForm />, { wrapper });
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/name/i), name);
    userEvent.type(screen.getByLabelText(/password/i), password);

    userEvent.click(screen.getByText(/sign me up/i));
    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalled();
    });
    // we cannot use "toHaveBeenCalledWith" because onSubmit is called with
    // 3 parameters. on the line bellow we check the first param passed to onSubmit
    // calls[0][0] means first call, first param
    // you can console.log(mockedOnSubmit.mock.calls) to see with what onSubmit is called
    expect(mockedOnSubmit.mock.calls[0][0]).toEqual({ email, name, password });
  });
});
