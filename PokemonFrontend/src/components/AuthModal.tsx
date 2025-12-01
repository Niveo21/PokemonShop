import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/service/registerService";
import { loginUser } from "@/service/loginService";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onSwitchMode: () => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  mode,
  onSwitchMode
}: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const {
    toast
  } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "register") {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        await registerUser({
          nombre: formData.name,
          emailRegistro: formData.email,
          password: formData.password
        });

        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada. ¡Empieza a coleccionar!"
        });
      } else {
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (response !== "Login exitoso") {
          throw new Error(response);
        }

        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión correctamente"
        });
      }

      onClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ha ocurrido un error",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md bg-card border-pokemon-red/20 overflow-hidden">
      {/* Decorative header */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pokemon-red via-pokemon-yellow to-pokemon-blue" />

      <DialogHeader className="pt-4">
        <div className="flex justify-center mb-4">

        </div>
        <DialogTitle className="text-center font-display text-3xl tracking-wider text-foreground">
          {mode === "login" ? "¡Bienvenido Entrenador!" : "Únete a la Aventura"}
        </DialogTitle>
        <p className="text-center text-muted-foreground text-sm">
          {mode === "login" ? "Ingresa tus credenciales para continuar" : "Crea tu cuenta y empieza a coleccionar"}
        </p>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {mode === "register" && <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Nombre de Entrenador</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="name" type="text" placeholder="Ash Ketchum" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="pl-10 bg-muted/50 border-border focus:border-pokemon-yellow focus:ring-pokemon-yellow/20" required />
          </div>
        </div>}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Correo Electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="entrenador@pokemon.com" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="pl-10 bg-muted/50 border-border focus:border-pokemon-yellow focus:ring-pokemon-yellow/20" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={e => setFormData({
              ...formData,
              password: e.target.value
            })} className="pl-10 pr-10 bg-muted/50 border-border focus:border-pokemon-yellow focus:ring-pokemon-yellow/20" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mode === "register" && <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={e => setFormData({
              ...formData,
              confirmPassword: e.target.value
            })} className="pl-10 bg-muted/50 border-border focus:border-pokemon-yellow focus:ring-pokemon-yellow/20" required />
          </div>
        </div>}

        <Button type="submit" variant="pokemon" size="lg" className="w-full font-sans" disabled={isLoading}>
          {isLoading ? "Cargando..." : (mode === "login" ? "Iniciar Sesión" : "Crear Cuenta")}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
          <button type="button" onClick={onSwitchMode} className="ml-1 text-pokemon-yellow hover:text-pokemon-yellow/80 font-medium transition-colors">
            {mode === "login" ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </div>
    </DialogContent>
  </Dialog>;
};
export default AuthModal;