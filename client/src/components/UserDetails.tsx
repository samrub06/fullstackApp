import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser, User, UserRequest } from '../services/userService';
import { addSavedUser } from '../store/userSlice';
import '../styles/UserDetails.css';

interface UserDetailsProps {
  user: User;
  onUpdateUser: (updatedUser: { email: string; name: { title: string; first: string; last: string; } }) => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, onUpdateUser }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState({
    title: user.name.title,
    first: user.name.first,
    last: user.name.last
  });

  const { mutate: saveUserMutation, isPending: isSaving, isError, isSuccess, error } = useMutation<UserRequest, Error, UserRequest>({
    mutationFn: (userToSave: UserRequest) => saveUser(userToSave),
    onSuccess: (savedUser) => {
      dispatch(addSavedUser(user));
    }
  });

  const handleUpdateUser = () => {
    const updatedUser = {
      email: user.email,
      name: editedName
    };
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handleSaveToServer = () => {
    const userToSave: UserRequest = {
      picture: {
        thumbnail: user.picture.thumbnail
      },
      name: user.name,
      gender: user.gender,
      country: user.location.country,
      phone: user.phone,
      email: user.email
    };
    saveUserMutation(userToSave);
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="user-details">
      <div className="user-image-container">
        <img 
          src={user.picture.large} 
          alt={`${user.name.first} ${user.name.last}`}
          className="user-large-image"
        />
        {!user.isSaved && (
          <div className="save-profile-container">
            <button 
              className="save-profile-button"
              onClick={handleSaveToServer}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save profile'}
            </button>
            {isSuccess && (
              <div className="save-message success">
                Profile saved successfully !
              </div>
            )}
            {isError && (
              <div className="save-message error">
                {error?.message === 'User already exists' 
                  ? 'Cet utilisateur existe déjà dans la base de données'
                  : 'Erreur lors de la sauvegarde du profil'}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="user-info-container">
        <div className="info-section">
          <h3>Personal informations</h3>
          <div className="info-row">
            <span className="info-label">Gender:</span>
            <span className="info-value">{user.gender}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Name:</span>
            {isEditing ? (
              <div className="name-edit">
                <input
                  type="text"
                  value={editedName.title}
                  onChange={(e) => setEditedName({...editedName, title: e.target.value})}
                  placeholder="Titre"
                />
                <input
                  type="text"
                  value={editedName.first}
                  onChange={(e) => setEditedName({...editedName, first: e.target.value})}
                  placeholder="Prénom"
                />
                <input
                  type="text"
                  value={editedName.last}
                  onChange={(e) => setEditedName({...editedName, last: e.target.value})}
                  placeholder="Nom"
                />
                <button onClick={handleUpdateUser}>Update</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>

              </div>
            ) : (
              <span className="info-value">
                {`${user.name.title} ${user.name.first} ${user.name.last}`}
                <button onClick={() => setIsEditing(true)}>Update</button>
              </span>
            )}
          </div>

          <div className="info-row">
            <span className="info-label">Age:</span>
            <span className="info-value">
              {calculateAge(user.dob.date)} ans ({new Date(user.dob.date).getFullYear()})
            </span>
          </div>
        </div>

        <div className="info-section">
          <h3>Address</h3>
          <div className="info-row">
            <span className="info-label">Street:</span>
            <span className="info-value">
              {`${user.location.street.number} ${user.location.street.name}`}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">City:</span>
            <span className="info-value">{user.location.city}</span>
          </div>
          <div className="info-row">
            <span className="info-label">State:</span>
            <span className="info-value">{user.location.state}</span>
          </div>
        </div>

        <div className="info-section">
          <h3>Contact</h3>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 