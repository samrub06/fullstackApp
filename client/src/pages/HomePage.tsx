import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserTable } from '../components/UserTable';
import { fetchUsers } from '../services/userService';
import { RootState } from '../store';
import { setUsers } from '../store/userSlice';
import '../styles/UserTable.css';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state: RootState) => state.users);

  const { mutate: fetchUsersMutation, isPending } = useMutation({
    mutationFn: fetchUsers,
    onSuccess: (data) => {
      dispatch(setUsers(data));
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    }
  });

  const handleFetch = () => {
    fetchUsersMutation();
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-screen">
      <h1>User List</h1>
      <div className="button-container">
        <button
          className={`fetch-button ${isPending ? 'loading' : ''}`}
          onClick={handleFetch}
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading-text">Loading...</span>
          ) : (
            users.length > 0 ? 'Refresh users' : 'Load users'
          )}
        </button>
      </div>
      {users.length > 0 && (
        <UserTable 
          users={users} 
        />
      )}
    </div>
  );
};