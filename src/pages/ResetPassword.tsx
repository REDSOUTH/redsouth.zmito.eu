import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { pb } from "@/lib/pb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = `REDSOUTH Studio — ${t("auth.reset_password_title", "Set new password")}`;
    if (!token) {
      toast.error(t("auth.reset_password_error", "Invalid or missing token."));
      navigate("/auth/signin");
    }
  }, [t, token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (password !== passwordConfirm) {
      toast.error(t("account.password_error", "Passwords do not match."));
      return;
    }

    setIsSubmitting(true);
    try {
      await pb.collection("users").confirmPasswordReset(token, password, passwordConfirm);
      setIsSuccess(true);
      toast.success(t("auth.reset_password_success", "Password reset successfully. You can now log in."));
      setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || t("auth.reset_password_error", "Failed to reset password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) return null;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 px-4">
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-background to-background"></div>
      
      <div className="container max-w-lg mx-auto relative">
        <Card className="border-foreground/5 bg-foreground/5 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <img src="/account-banner.svg" alt="REDSOUTH Account" className="h-16 object-contain drop-shadow-md" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {t("auth.reset_password_title", "Set new password")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("auth.reset_password_desc", "Enter your new password below.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="text-green-500 font-medium">
                  {t("auth.reset_password_success", "Password reset successfully. You can now log in.")}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link to="/auth/signin">{t("header.login", "Log In")}</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    {t("account.new_password", "New password")}
                  </label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-background/50 border-foreground/10 focus-visible:ring-red-500" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="passwordConfirm" className="text-sm font-medium leading-none">
                    {t("account.confirm_password", "Confirm new password")}
                  </label>
                  <Input 
                    id="passwordConfirm" 
                    type="password" 
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    minLength={8}
                    className="bg-background/50 border-foreground/10 focus-visible:ring-red-500" 
                  />
                </div>

                <Button type="submit" disabled={isSubmitting || !password || !passwordConfirm} className="w-full">
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {t("auth.reset_password_btn", "Reset password")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
