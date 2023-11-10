import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import UserForm from "../components/UserForm";
import "../assets/profile-page.css"

function ProfilePage() {
  const { register, handleSubmit, reset } = useForm();
  const {
    user,
    changeUsername,
    changePassword,
    errors: errors,
    errorsOccurred,
    profileDataChanged
  } = useAuth();

  const [changeFormData, setChangeFormData] = useState(null);
  const [usernameShowed, setUsernameShowed] = useState(user.username)

  const onSubmitChangeUsername = handleSubmit(async (values) => {
    const newUsername = await changeUsername({
      newUsername: values.newUsername.length ? values.newUsername : undefined,
    });
    if(newUsername) setUsernameShowed(newUsername)
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
      onSubmit: async (data) => {
        await onSubmitChangeUsername(data);
      },
    });
  };

  const onChangePassword = () => {
    setChangeFormData({
      name: "password",
      fields: { password: "password", newPassword: "password" },
      onSubmit: async (data) => {
        await onSubmitChangePassword(data);
      },
    });
  };

  useEffect(() => {
    document.title = user.username + " profile";
  }, []);

  useEffect(() => {
    if(profileDataChanged[0]) reset()
  }, [profileDataChanged]);

  return (
    <div className="page-container">
      <div className={`profile-alert-message ${profileDataChanged[0] ? "message-in" : "message-out"} bg-warning text-dark position-absolute`}>{profileDataChanged[1]}</div>
      <h1 className="page-title">Profile</h1>
      <div className="profile-container mt-5 text-light d-flex flex-column align-items-center">
        <h1>{usernameShowed}</h1>
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
        <div className="position-relative">
          <UserForm
            id={`change-${changeFormData.name}-form`}
            onSubmit={changeFormData.onSubmit}
            register={register}
            errors={errors}
            errorsOccurred={errorsOccurred}
            fields={changeFormData.fields}
            operation={`Change ${changeFormData.name}`}
          />
          <div className="close-btn bg-warning position-absolute top-0 end-0 d-flex align-center">
            <img
              width={25}
              src="/close-square.svg"
              onClick={() => {
                setChangeFormData(null);
              }}
              alt="Close button"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
