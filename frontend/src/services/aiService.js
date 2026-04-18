import api from './api';

export const sendMessage = (message, mode = 'explain') =>
    api.post('ai/chat/', { message, mode });