import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Markdown } from "@/components/ui/markdown";
import { Skeleton } from "@/components/ui/skeleton";

const VALID_DOCUMENTS = ["terms", "privacy", "cookies", "trademarks"];

export function Legal() {
  const { document } = useParams<{ document: string }>();
  const { i18n } = useTranslation();
  
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!document || !VALID_DOCUMENTS.includes(document)) {
      return;
    }

    const lang = i18n.language.startsWith("es") ? "es" : "en";
    setIsLoading(true);
    setError(false);

    fetch(`/legal/${lang}/${document}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Document not found");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [document, i18n.language]);

  if (!document || !VALID_DOCUMENTS.includes(document)) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 px-4 md:py-20">
      <div className="container max-w-3xl mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 mb-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-8 w-1/2 mt-8 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-2">Document not found</h1>
            <p className="text-muted-foreground">The requested legal document could not be loaded.</p>
          </div>
        ) : (
          <Markdown content={content} />
        )}
      </div>
    </section>
  );
}
