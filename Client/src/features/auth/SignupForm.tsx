import { UserRole } from "@/data/mockData";
import { signup } from "../../api/auth/signup";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Mail,
  User,
  UserCircle,
  Users,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const roles = [
    {
      id: "Student" as UserRole,
      label: "Student",
      icon: User,
      color: "bg-student",
      description: "Access courses and track learning",
    },
    {
      id: "Parent" as UserRole,
      label: "Parent",
      icon: Users,
      color: "bg-parent",
      description: "Monitor your child's progress",
    },
    {
      id: "Teacher" as UserRole,
      label: "Teacher",
      icon: BookOpen,
      color: "bg-teacher",
      description: "Create and sell courses",
    },
  ];
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    setIsLoading(true);
    setError(null); // reset error

    try {
      const result = await signup({
        username,
        email,
        selectedRole,
        password,
      });

      if (result) {
        navigate("/login");
      }
    } catch (err: any) {
      console.error(err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSignup} className="space-y-5">
      {/* Role Selection */}
      <div>
        <Label className="text-base mb-3 block">I want to join as</Label>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                selectedRole === role.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div
                className={`p-2 ${role.color} rounded-lg w-fit mx-auto mb-2`}
              >
                <role.icon className="h-5 w-5 text-white" />
              </div>
              <div className="font-medium text-sm">{role.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name">Full Name</Label>
        <div className="relative mt-1">
          <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            className="pl-10"
            required
          />
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
          {error}
        </div>
      )}
      <Button
        type="submit"
        className="w-full hero-gradient text-primary-foreground hover:opacity-90 gap-2"
        disabled={
          !selectedRole || isLoading || !username || !email || !password
        }
      >
        {isLoading ? "Creating account..." : "Create Account"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SignupForm;
