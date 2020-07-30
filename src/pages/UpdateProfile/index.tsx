import React, { useCallback, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import fire from "firebase";
import { updateUserProfile } from "../../functionsHelpers/myFunctions";
import { Header } from "../../pages/home/header";
import "./index.css";

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}
const UpdateProfile: React.FC<ChildComponentProps> = ({ history }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [userImage, setImage] = useState<string | Blob | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const handlePhoneChange = useCallback(
    (event) => setPhoneNumber(event.target.value),
    []
  );

  const handleImageChange = useCallback((event) => {
    setImage(event.target.files[0]);
  }, []);

  const handleUpdate = useCallback(
    async (event) => {
      event.preventDefault();
      const fd = new FormData();
      if (currentUserId && userImage && phoneNumber) {
        fd.append("currentUserId", currentUserId);
        fd.append("phoneNumber", phoneNumber);
        fd.append("avatar", userImage);
        const res = await updateUserProfile(fd);
        history.push("/");
      }
    },
    [userImage, phoneNumber, currentUserId, history]
  );
  const handleCancel = useCallback((_) => history.push("/"), [history]);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      const uid: string | undefined = user?.uid;
      if (uid) setCurrentUserId(uid);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <form>
          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input onChange={handlePhoneChange} type="tel" id="phone" />
          </div>
          <div className="form-control">
            <label htmlFor="avatar">Avatar</label>
            <input
              onChange={handleImageChange}
              type="file"
              id="avatar"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="form-control">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </form>
        <div className="image-preview">
          {userImage ? (
            <img
              className="image"
              src={URL.createObjectURL(userImage)}
              alt="img"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withRouter(UpdateProfile);
