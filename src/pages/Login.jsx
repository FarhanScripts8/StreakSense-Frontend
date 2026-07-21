import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Sparkles, Sun, Moon, Eye, EyeOff } from "lucide-react"; // 👈 added Eye, EyeOff
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const { theme, toggle } = useTheme();

  const loc = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");       // password state
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // visibility state

  // If already logged in, redirect to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);                   // uses password state
      navigate(loc.state?.from || "/dashboard", { replace: true });
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <button
        onClick={toggle}
        className="fixed top-4 right-4 p-2.5 rounded-xl glass"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Sparkles size={18} />
          </div>
          <span className="font-semibold text-lg">StreakSense</span>
        </Link>

        <div className="card p-7">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted mt-1">
            Log in to continue your streaks.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="password-field">
              <label className="label">Password</label>
              <div className="password-input-wrapper">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} />   // when visible, show "hide" icon
                  ) : (
                    <Eye size={16} />      // when hidden, show "show" icon
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-soft">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-600 dark:text-brand-300 font-medium"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}