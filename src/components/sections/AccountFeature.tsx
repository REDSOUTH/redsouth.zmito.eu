import { motion } from "framer-motion";
import { UserCircle2, ArrowRightLeft, MonitorSmartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AccountFeature() {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden" id="account">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-900/10 via-background to-background"></div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400 mb-6"
          >
            <UserCircle2 className="mr-2 h-4 w-4" />
            <span>{t('account.tag')}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            {t('account.title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground md:text-lg"
          >
            {t('account.description')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: t('account.features.unified_title'),
              desc: t('account.features.unified_desc'),
              icon: UserCircle2,
            },
            {
              title: t('account.features.seamless_title'),
              desc: t('account.features.seamless_desc'),
              icon: ArrowRightLeft,
            },
            {
              title: t('account.features.security_title'),
              desc: t('account.features.security_desc'),
              icon: MonitorSmartphone,
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-foreground/5 border border-foreground/10 relative overflow-hidden"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
