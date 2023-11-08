import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import UserForm from "../components/UserForm";

function ProfilePage() {
  const { register, handleSubmit } = useForm();
  const {
    user,
    changeUsername,
    changePassword,
    errors: errors,
    errorsOccurred,
  } = useAuth();

  const [changeFormData, setChangeFormData] = useState(null);

  const onSubmitChangeUsername = handleSubmit(async (values) => {
    await changeUsername({
      newUsername: values.newUsername.length ? values.newUsername : undefined,
    });
  });

  const onSubmitChangePassword = handleSubmit(async (values) => {
    await changePassword({
      password: values.password.length ? values.password : undefined,
      newPassword: values.newPassword.length ? values.newPassword : undefined,
    });
  });

  const onChangeUsername = () => {
    setChangeFormData({
      name: "username",
      fields: { newUsername: "text" },
      onSubmit: onSubmitChangeUsername,
    });
  };

  const onChangePassword = () => {
    setChangeFormData({
      name: "password",
      fields: { password: "password", newPassword: "password" },
      onSumbit: onSubmitChangePassword,
    });
  };

  useEffect(() => {
    document.title = user.username + " profile";
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>
      <div className="profile-container mt-5 text-light d-flex flex-column align-items-center">
        <h1>{user.username}</h1>
        <div>email: {user.email}</div>
      </div>
      <div className="edit-profile">
        <div className="edit-profile-btn" onClick={onChangeUsername}>
          Change username
        </div>
        <div className="edit-profile-btn" onClick={onChangePassword}>
          Change password
        </div>
      </div>
      {changeFormData != null && (
        <div>
          <UserForm
            id={`change-${changeFormData.name}-form`}
            onSubmit={changeFormData.onSubmit}
            register={register}
            errors={errors}
            errorsOccurred={errorsOccurred}
            fields={changeFormData.fields}
            operation={`Change ${changeFormData.name}`}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
