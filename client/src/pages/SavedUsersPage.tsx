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
                dispatch(setError('Erreur lors de la récupération des utilisateurs sauvegardés'));
                dispatch(setLoading(false));
            }
        };

        fetchSavedUsers();
    }, [dispatch]);

    const handleBack = () => {
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={handleBack}>Retour à l'accueil</button>
            </div>
        );
    }

    return (
        <div className="saved-users-page">
            <div className="page-header">
                <button className="back-button" onClick={handleBack}>
                    ← Retour
                </button>
                <h1>Utilisateurs Sauvegardés</h1>
            </div>
            {savedUsers.length > 0 ? (
                <UserTable users={savedUsers} />
            ) : (
                <div className="no-users">
                    <p>Aucun utilisateur sauvegardé</p>
                </div>
            )}
        </div>
    );
}; 