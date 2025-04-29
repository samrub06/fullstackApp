import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserTable } from '../components/UserTable';
import { getSavedUsers } from '../services/userService';
import { RootState } from '../store';
import { setError, setLoading, setSavedUsers } from '../store/userSlice';
import '../styles/UserTable.css';

export const SavedUsersPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { savedUsers, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        const fetchSavedUsers = async () => {
            try {
                dispatch(setLoading(true));
                const users = await getSavedUsers();
                dispatch(setSavedUsers(users));
                dispatch(setLoading(false));
            } catch (error) {
                dispatch(setError('Error while fetching saved users'));
                dispatch(setLoading(false));
            }
        };

        fetchSavedUsers();
    }, [dispatch]);

    const handleBack = () => {
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={handleBack}>Back to home</button>
            </div>
        );
    }

    return (
        <div className="saved-users-page">
            <div className="page-header">
                <button className="back-button" onClick={handleBack}>
                    ← Back to home
                </button>
                <h1>Saved Users</h1>
            </div>
            {savedUsers.length > 0 ? (
                <UserTable users={savedUsers} />
            ) : (
                <div className="no-users">
                    <p>No saved users</p>
                </div>
            )}
        </div>
    );
}; 