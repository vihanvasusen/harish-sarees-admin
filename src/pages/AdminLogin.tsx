import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminLogin = () => {
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-2">Admin Login</h1>
        <p className="text-muted-foreground font-body text-sm text-center mb-6">Harish Sarees Dashboard</p>

        {error && <p className="text-destructive text-sm font-body text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body text-foreground mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body text-foreground mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-body font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
