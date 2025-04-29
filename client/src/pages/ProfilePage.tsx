import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UserDetails } from "../components/UserDetails";
import { User, UserRequest, UserUpdate, updateUser } from '../services/userService';
import { RootState } from '../store';
import { updateUser as updateUserAction } from '../store/userSlice';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useParams<{ email: string }>();
    
    const user = useSelector((state: RootState) => 
        state.users.users.find(u => u.email === email) || 
        state.users.savedUsers.find(u => u.email === email)
    );
    
    const { mutateAsync: updateUserData } = useMutation<UserRequest, Error, UserUpdate>({
        mutationFn: (userToSave: UserUpdate) => updateUser(userToSave),
    });

    const handleUserUpdate = async (updatedUser: UserUpdate) => {
      const userToUpdate = {
        email: updatedUser.email,
        name: updatedUser.name,
      }
      try {
          // Si l'utilisateur est sauvegardé, on met à jour le serveur
          if (user?.isSaved) {
              const savedUser = await updateUserData(userToUpdate);
              const updatedUserData = {
                  ...user,
                  name: savedUser.name,
              } as User;
              dispatch(updateUserAction(updatedUserData));
          } else {
              // Si l'utilisateur n'est pas sauvegardé, on met juste à jour le store Redux
              const updatedUserData = {
                  ...user,
                  name: userToUpdate.name,
              } as User;
              dispatch(updateUserAction(updatedUserData));
          }
      } catch (error) {
          console.error('Error updating user:', error);
      }
    };

    const handleBack = () => {
        navigate('/');
    };

    if (!user) {
        return (
            <div className="error-message">
                <p>User not found</p>
                <button onClick={handleBack}>Back to home</button>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button className="back-button" onClick={handleBack}>
                    ← Back
                </button>
                <h1>Profile Details</h1>
            </div>
            <div className="profile-content">
                <UserDetails 
                    user={user} 
                    onUpdateUser={handleUserUpdate} 
                />
            </div>
        </div>
    );
};