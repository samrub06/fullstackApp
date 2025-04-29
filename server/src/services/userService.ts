import User, { IUser } from '../models/User';

export const userService = {
    // Récupérer tous les utilisateurs avec pagination et tri
    async getUsers({ limit = 10, offset = 0, sortBy, order = 'asc' }: {
        limit?: number;
        offset?: number;
        sortBy?: string;
        order?: 'asc' | 'desc';
    }) {
        const query = User.find();
        
        if (sortBy) {
            query.sort({ [sortBy]: order === 'desc' ? -1 : 1 });
        }
        
        query.skip(offset).limit(limit);
        
        const [users, total] = await Promise.all([
            query.exec(),
            User.countDocuments()
        ]);
        
        return { users, total };
    },

    // Créer un nouvel utilisateur
    async createUser(userData: Partial<IUser>) {
        const user = new User(userData);
        return await user.save();
    },

    // Mettre à jour un utilisateur
    async updateUser(userData: Partial<IUser>) {
        // find with email 
        const user = await User.findOneAndUpdate(
            { email: userData.email },
            userData,
            { new: true }
        );
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    },

    // Supprimer un utilisateur
    async deleteUser(email: string) {
        const user = await User.findOneAndDelete({ email });
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    },

    // Récupérer un utilisateur par son ID
    async getUserByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }
}; 