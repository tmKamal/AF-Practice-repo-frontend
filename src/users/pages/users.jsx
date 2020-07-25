import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";
import UserList from "../components/user-list/user-list";
import ErrorModal from "../../shared/components/UIElements/model/error-model";
import LoadingSpinner from "../../shared/components/UIElements/loading-spinner/loading-spinner";

const Users = () => {
  const {isLoading,error,sendRequest,errorPopupCloser}=useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {// we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes. 
    const fetchUsers = async () => {// this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.
      
      try {
        const responseData = await sendRequest("http://localhost:8000/api/users");
        
        
        setLoadedUsers(responseData.users);//this is the key of the response - view the backend code for more.
      } catch (err) {
        
      }
      
    };
    fetchUsers();
  }, [sendRequest]);
  
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
