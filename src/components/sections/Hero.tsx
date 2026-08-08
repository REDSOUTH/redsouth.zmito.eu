import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12" id="home">
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center -mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 mt-8"
        >
          {t('hero.welcome')} <br className="hidden sm:block" />
          <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 uppercase">
            REDSOUTH Studio
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed mb-10"
        >
          <Trans i18nKey="hero.description" components={{ 
            1: <strong className="text-foreground font-semibold" />,
            3: <strong className="text-foreground font-semibold" />,
            br: <br />
          }} />
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild className="relative group border-0 overflow-hidden bg-white hover:bg-white [&_svg]:size-6">
            <a href="#services" className="flex items-center justify-center cursor-pointer">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#FF9D00] transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="relative flex items-center justify-center">
                {/* White Text & Icon (Base) */}
                <div className="flex items-center transition-opacity duration-500 group-hover:opacity-0">
                  <span className="font-bold text-base text-white mr-2">
                    {t('hero.learn_more')}
                  </span>
                  <ArrowRight className="text-white" />
                </div>
                
                {/* Gradient Text & Colored Icon (Hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-bold text-base bg-gradient-to-r from-[#FF0000] to-[#FF9D00] bg-clip-text text-transparent mr-2">
                    {t('hero.learn_more')}
                  </span>
                  <ArrowRight className="text-[#FF9D00]" />
                </div>
              </div>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
