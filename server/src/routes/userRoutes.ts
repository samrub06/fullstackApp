import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit, offset, sortBy, order } = req.query;
    const result = await userService.getUsers({
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
      sortBy: sortBy as string,
      order: order as 'asc' | 'desc'
    });
    res.json(result.users);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) throw new Error('User already exists');
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    res.json(user);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Error updating user', error: error.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
  }
});

router.get('/:email', async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Error fetching user', error: error.message });
    }
  }
});

export default router; 