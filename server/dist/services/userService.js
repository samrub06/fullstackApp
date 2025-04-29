"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.userService = {
    // Récupérer tous les utilisateurs avec pagination et tri
    getUsers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit = 10, offset = 0, sortBy, order = 'asc' }) {
            const query = User_1.default.find();
            if (sortBy) {
                query.sort({ [sortBy]: order === 'desc' ? -1 : 1 });
            }
            query.skip(offset).limit(limit);
            const [users, total] = yield Promise.all([
                query.exec(),
                User_1.default.countDocuments()
            ]);
            return { users, total };
        });
    },
    // Créer un nouvel utilisateur
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(userData);
            return yield user.save();
        });
    },
    // Mettre à jour un utilisateur
    updateUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // find with email 
            const user = yield User_1.default.findOneAndUpdate({ email: userData.email }, userData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    },
    // Supprimer un utilisateur
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOneAndDelete({ email });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    },
    // Récupérer un utilisateur par son ID
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            return user;
        });
    }
};
