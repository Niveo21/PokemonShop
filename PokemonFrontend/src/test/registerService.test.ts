import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('registerService', () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('should call fetch with correct URL and method for registration', async () => {
        const mockUser = {
            nombre: 'Ash Ketchum',
            emailRegistro: 'ash@pokemon.com',
            password: 'pikachu123'
        };

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => 'Registro almacenado',
        });

        const { registerUser } = await import('../service/registerService');
        await registerUser(mockUser);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/registro',
            expect.objectContaining({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('should send user data in request body', async () => {
        const mockUser = {
            nombre: 'Misty',
            emailRegistro: 'misty@pokemon.com',
            password: 'starmie456'
        };

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => 'Registro almacenado',
        });

        const { registerUser } = await import('../service/registerService');
        await registerUser(mockUser);

        const callArgs = (global.fetch as any).mock.calls[0];
        const requestBody = JSON.parse(callArgs[1].body);

        expect(requestBody.nombre).toBe('Misty');
        expect(requestBody.emailRegistro).toBe('misty@pokemon.com');
        expect(requestBody.password).toBe('starmie456');
    });

    it('should return success message on successful registration', async () => {
        const mockUser = {
            nombre: 'Brock',
            emailRegistro: 'brock@pokemon.com',
            password: 'onix789'
        };

        const successMessage = 'Registro almacenado';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            text: async () => successMessage,
        });

        const { registerUser } = await import('../service/registerService');
        const result = await registerUser(mockUser);

        expect(result).toBe(successMessage);
    });

    it('should throw error when server returns error status', async () => {
        const mockUser = {
            nombre: 'Gary',
            emailRegistro: 'gary@pokemon.com',
            password: 'eevee321'
        };

        (global.fetch as any).mockResolvedValue({
            ok: false,
            text: async () => 'Email ya existe',
        });

        const { registerUser } = await import('../service/registerService');

        await expect(registerUser(mockUser)).rejects.toThrow('Email ya existe');
    });

    it('should handle network errors', async () => {
        const mockUser = {
            nombre: 'May',
            emailRegistro: 'may@pokemon.com',
            password: 'blaziken654'
        };

        (global.fetch as any).mockRejectedValue(new Error('Network error'));

        const { registerUser } = await import('../service/registerService');

        await expect(registerUser(mockUser)).rejects.toThrow('Network error');
    });
});
