import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AccountFeature } from "@/components/sections/AccountFeature";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `REDSOUTH Studio — ${t("header.home", "Home")}`;
  }, [t]);

  return (
    <>
      <Hero />
      <Services />
      <AccountFeature />
    </>
  );
}
