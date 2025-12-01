import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('loginService', () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('should call fetch with correct URL and method for login', async () => {
        const mockCredentials = {
            email: 'ash@pokemon.com',
            password: 'pikachu123'
        };

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => 'Login exitoso',
        });

        const { loginUser } = await import('../service/loginService');
        await loginUser(mockCredentials);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/login',
            expect.objectContaining({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('should send credentials in request body', async () => {
        const mockCredentials = {
            email: 'misty@pokemon.com',
            password: 'starmie456'
        };

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => 'Login exitoso',
        });

        const { loginUser } = await import('../service/loginService');
        await loginUser(mockCredentials);

        const callArgs = (global.fetch as any).mock.calls[0];
        const requestBody = JSON.parse(callArgs[1].body);

        expect(requestBody.email).toBe('misty@pokemon.com');
        expect(requestBody.password).toBe('starmie456');
    });

    it('should return success message on successful login', async () => {
        const mockCredentials = {
            email: 'brock@pokemon.com',
            password: 'onix789'
        };

        const successMessage = 'Login exitoso';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => successMessage,
        });

        const { loginUser } = await import('../service/loginService');
        const result = await loginUser(mockCredentials);

        expect(result).toBe(successMessage);
    });

    it('should return error message when user not found', async () => {
        const mockCredentials = {
            email: 'nonexistent@pokemon.com',
            password: 'wrongpass'
        };

        const errorMessage = 'Usuario no encontrado';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => errorMessage,
        });

        const { loginUser } = await import('../service/loginService');
        const result = await loginUser(mockCredentials);

        expect(result).toBe(errorMessage);
    });

    it('should return error message when password is incorrect', async () => {
        const mockCredentials = {
            email: 'ash@pokemon.com',
            password: 'wrongpassword'
        };

        const errorMessage = 'Contraseña incorrecta';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => errorMessage,
        });

        const { loginUser } = await import('../service/loginService');
        const result = await loginUser(mockCredentials);

        expect(result).toBe(errorMessage);
    });

    it('should throw error when server returns error status', async () => {
        const mockCredentials = {
            email: 'gary@pokemon.com',
            password: 'eevee321'
        };

        (global.fetch as any).mockResolvedValue({
            ok: false,
            text: async () => 'Internal Server Error',
        });

        const { loginUser } = await import('../service/loginService');

        await expect(loginUser(mockCredentials)).rejects.toThrow('Internal Server Error');
    });

    it('should handle network errors', async () => {
        const mockCredentials = {
            email: 'may@pokemon.com',
            password: 'blaziken654'
        };

        (global.fetch as any).mockRejectedValue(new Error('Network error'));

        const { loginUser } = await import('../service/loginService');

        await expect(loginUser(mockCredentials)).rejects.toThrow('Network error');
    });
});
