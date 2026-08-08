import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `REDSOUTH Studio — ${t("header.contact", "Contact")}`;
  }, [t]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 px-4">
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-background to-background"></div>
      
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[600px] mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-foreground/5 bg-foreground/5 backdrop-blur-md shadow-2xl">
            <CardHeader>
              <CardTitle className="sr-only">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t('contact.form.name')}
                    </label>
                    <Input id="name" placeholder="John Doe" className="bg-background/50 border-foreground/10 focus-visible:ring-red-500" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t('contact.form.email')}
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50 border-foreground/10 focus-visible:ring-red-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t('contact.form.subject')}
                  </label>
                  <Input id="subject" placeholder="How can we help?" className="bg-background/50 border-foreground/10 focus-visible:ring-red-500" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    className="min-h-[150px] bg-background/50 border-foreground/10 focus-visible:ring-red-500 resize-none" 
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto relative group border-0 overflow-hidden bg-white hover:bg-white shadow-lg">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000] to-[#FF9D00] transition-opacity duration-500 group-hover:opacity-0" />
                  
                  <div className="relative flex items-center justify-center">
                    {/* White Text (Base) */}
                    <span className="font-bold text-white transition-opacity duration-500 group-hover:opacity-0">
                      {t('contact.form.submit')}
                    </span>
                    
                    {/* Gradient Text (Hover) */}
                    <span className="absolute inset-0 flex items-center justify-center font-bold bg-gradient-to-r from-[#FF0000] to-[#FF9D00] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {t('contact.form.submit')}
                    </span>
                  </div>
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
