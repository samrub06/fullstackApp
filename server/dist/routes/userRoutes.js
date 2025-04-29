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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("../services/userService");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset, sortBy, order } = req.query;
        const result = yield userService_1.userService.getUsers({
            limit: limit ? parseInt(limit) : undefined,
            offset: offset ? parseInt(offset) : undefined,
            sortBy: sortBy,
            order: order
        });
        res.json(result.users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.getUserByEmail(req.body.email);
        if (user)
            throw new Error('User already exists');
        const newUser = yield userService_1.userService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.updateUser(req.body);
        res.json(user);
    }
    catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Error updating user', error: error.message });
        }
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_1.userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Error deleting user', error: error.message });
        }
    }
}));
router.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.getUserByEmail(req.params.email);
        res.json(user);
    }
    catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Error fetching user', error: error.message });
        }
    }
}));
exports.default = router;
