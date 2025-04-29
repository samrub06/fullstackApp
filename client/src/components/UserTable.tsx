import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../services/userService';
import { RootState } from '../store';
import '../styles/UserTable.css';

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const savedUsers = useSelector((state: RootState) => state.users.savedUsers);

  const handleRowClick = (user: User) => {
    navigate(`/profile/${user.email}`);
  };

  // Fusionner les utilisateurs avec les données de sauvegarde
  const usersWithSavedStatus = users.map(user => {
    const savedUser = savedUsers.find(saved => saved.email === user.email);
    return savedUser ? { ...user, isSaved: true } : user;
  });

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Phone</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {usersWithSavedStatus.map((user :any) => (
          <tr 
            key={user.id?.value || user.email} 
            onClick={() => handleRowClick(user)} 
            className={`user-row ${user.isSaved ? 'saved' : ''}`}
          >
            <td>
              <img 
                src={user.picture.thumbnail} 
                alt={`${user.name.first} ${user.name.last}`}
                className="user-avatar"
              />
            </td>
            <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.country}</td>
            <td>{user.phone}</td>
            <td>
              {user.isSaved ? (
                <span className="saved-badge">Saved</span>
              ) : (
                <span className="not-saved-badge">Not saved</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}; 