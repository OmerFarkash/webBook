import { createContext } from 'react';
import { defaultUser } from './API/userApi';

const ProfileContext = createContext(defaultUser);

export default ProfileContext;