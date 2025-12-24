import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function BackendStatus() {
  const [status, setStatus] = useState("loading"); // loading | connected | error

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from("properties").select("id").limit(1);
        setStatus(error ? "error" : "connected");
      } catch {
        setStatus("error");
      }
    };
    checkConnection();
  }, []);

  if (status === "loading") {
    return (
      <Badge variant="outline" className="gap-1.5 bg-background/80 backdrop-blur-sm">
        <Loader2 className="h-3 w-3 animate-spin" />
        Checking...
      </Badge>
    );
  }

  if (status === "connected") {
    return (
      <Badge variant="outline" className="gap-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
        <CheckCircle className="h-3 w-3" />
        Backend Connected
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1.5 bg-destructive/10 text-destructive border-destructive/30">
      <XCircle className="h-3 w-3" />
      Connection Error
    </Badge>
  );
}
