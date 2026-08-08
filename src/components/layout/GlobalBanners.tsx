import { useAlertStore, type AlertType } from "@/store/useAlertStore";
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const alertStyles: Record<AlertType, { bg: string; border: string; text: string; icon: any }> = {
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    icon: Info,
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500",
    icon: AlertTriangle,
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: AlertCircle,
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-500",
    icon: CheckCircle2,
  },
};

export function GlobalBanners() {
  const { alerts, dismissedIds, dismissAlert } = useAlertStore();

  const activeAlerts = alerts.filter(alert => !dismissedIds.includes(alert.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence>
        {activeAlerts.map((alert) => {
          const style = alertStyles[alert.type] || alertStyles.info;
          const Icon = style.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`w-full border-b ${style.border} ${style.bg}`}
            >
              <div className="container max-w-screen-2xl flex items-start sm:items-center justify-between gap-4 py-3">
                <div className="flex items-start sm:items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 ${style.text}`} />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-sm leading-tight text-foreground">{alert.title}</span>
                    <span className="hidden sm:block text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground leading-snug">{alert.description}</span>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
