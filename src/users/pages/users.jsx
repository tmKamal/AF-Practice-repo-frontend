import React, { useEffect, useState } from "react";
import UserList from "../components/user-list/user-list";
import ErrorModal from "../../shared/components/UIElements/model/error-model";
import LoadingSpinner from "../../shared/components/UIElements/loading-spinner/loading-spinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {// we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to alll the changes. 
    const sendRequest = async () => {// this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);//this is the key of the response - view the backend code for more.
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorPopupCloser = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
      {isLoading && (
        <div className="center">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {loadedUsers && !isLoading && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
