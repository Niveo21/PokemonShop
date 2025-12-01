import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import AuthModal from '../components/AuthModal';


vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: vi.fn(),
    }),
}));


vi.mock('@/service/registerService', () => ({
    registerUser: vi.fn(),
}));

vi.mock('@/service/loginService', () => ({
    loginUser: vi.fn(),
}));

describe('AuthModal Component', () => {
    const mockOnClose = vi.fn();
    const mockOnSwitchMode = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('debe mostrar el modal de registro cuando mode es "register"', () => {
        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('Únete a la Aventura')).toBeInTheDocument();
        expect(screen.getByText('Crea tu cuenta y empieza a coleccionar')).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre de Entrenador/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    });

    test('debe mostrar el modal de login cuando mode es "login"', () => {
        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('¡Bienvenido Entrenador!')).toBeInTheDocument();
        expect(screen.getByText('Ingresa tus credenciales para continuar')).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    test('debe mostrar campo de Nombre solo en modo registro', () => {
        const { rerender } = render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByLabelText(/Nombre de Entrenador/i)).toBeInTheDocument();

        rerender(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.queryByLabelText(/Nombre de Entrenador/i)).not.toBeInTheDocument();
    });

    test('debe mostrar campo de Confirmar Contraseña solo en modo registro', () => {
        const { rerender } = render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();

        rerender(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.queryByLabelText(/Confirmar Contraseña/i)).not.toBeInTheDocument();
    });

    test('debe permitir escribir en los campos del formulario', () => {
        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        const nameInput = screen.getByPlaceholderText('Ash Ketchum');
        const emailInput = screen.getByPlaceholderText('entrenador@pokemon.com');
        const passwordInput = screen.getAllByPlaceholderText('••••••••')[0];

        fireEvent.change(nameInput, { target: { value: 'Ash Ketchum' } });
        fireEvent.change(emailInput, { target: { value: 'ash@pokemon.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pikachu123' } });

        expect(nameInput).toHaveValue('Ash Ketchum');
        expect(emailInput).toHaveValue('ash@pokemon.com');
        expect(passwordInput).toHaveValue('pikachu123');
    });

    test('debe mostrar/ocultar contraseña al hacer click en el icono del ojo', () => {
        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        const passwordInput = screen.getByPlaceholderText('••••••••');
        const toggleButtons = screen.getAllByRole('button', { name: '' });
        const eyeButton = toggleButtons.find(btn => btn.querySelector('svg'));

       
        expect(passwordInput).toHaveAttribute('type', 'password');

        
        if (eyeButton) {
            fireEvent.click(eyeButton);
            expect(passwordInput).toHaveAttribute('type', 'text');

            
            fireEvent.click(eyeButton);
            expect(passwordInput).toHaveAttribute('type', 'password');
        }
    });

    test('debe llamar a onSwitchMode al hacer click en el link de cambio de modo', () => {
        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        const switchButton = screen.getByText('Regístrate');
        fireEvent.click(switchButton);

        expect(mockOnSwitchMode).toHaveBeenCalledTimes(1);
    });

    test('debe mostrar el texto correcto del botón según el modo', () => {
        const { rerender } = render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();

        rerender(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    test('debe deshabilitar el botón mientras está cargando', async () => {
        const { registerUser } = await import('@/service/registerService');
        (registerUser as any).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        const nameInput = screen.getByPlaceholderText('Ash Ketchum');
        const emailInput = screen.getByPlaceholderText('entrenador@pokemon.com');
        const passwordInputs = screen.getAllByPlaceholderText('••••••••');
        const submitButton = screen.getByText('Crear Cuenta');

        fireEvent.change(nameInput, { target: { value: 'Ash' } });
        fireEvent.change(emailInput, { target: { value: 'ash@pokemon.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: 'pikachu123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'pikachu123' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Cargando...')).toBeInTheDocument();
        });
    });

    test('debe mostrar el link correcto para cambiar de modo', () => {
        const { rerender } = render(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="login"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('¿No tienes una cuenta?')).toBeInTheDocument();
        expect(screen.getByText('Regístrate')).toBeInTheDocument();

        rerender(
            <AuthModal
                isOpen={true}
                onClose={mockOnClose}
                mode="register"
                onSwitchMode={mockOnSwitchMode}
            />
        );

        expect(screen.getByText('¿Ya tienes una cuenta?')).toBeInTheDocument();
        expect(screen.getByText('Inicia Sesión')).toBeInTheDocument();
    });
});
