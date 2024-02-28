import { FC, useState } from "react";
import "./index.css"; // Import the CSS file
import { IUser } from "../interfaces";

interface IUserForm {
  onSubmit: (data: IUser) => void;
}

const INITIAL_FORM_DATA: IUser = { name: "", email: "", createdAt: "" };

const UserForm: FC<IUserForm> = ({onSubmit: onSubmitFunc}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please fill all fields");
      return;
    }

    const newUser: IUser = { ...formData, createdAt: new Date().toLocaleString() };
    onSubmitFunc(newUser)

    setFormData(INITIAL_FORM_DATA);
    setErrorMessage("");
  };

  return (
    <div className="user-form-container">
      <h2>User Creation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
