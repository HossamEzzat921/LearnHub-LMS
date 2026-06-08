import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "@/api/auth/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const result = await login({ email, password });

      if (result) {
        dispatch(
          setCredentials({
            user: result.user,
            accessToken: result.accessToken,
          }),
        );
       
        if(result.user.role === "Student"){
           navigate(`/student/${result.user.id}/dashboard`);
        }
        if(result.user.role === "Teacher"){
           navigate(`/teacher/${result.user.id}/dashboard`);
        }
        if(result.user.role === "Parent"){
           navigate(`/parent/${result.user.id}/dashboard`);
        }
        
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="email@example.cpom"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full hero-gradient text-primary-foreground hover:opacity-90 gap-2"
        disabled={isLoading || !email || !password}
      >
        {isLoading ? "Signing in..." : "Sign In"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default LoginForm;
