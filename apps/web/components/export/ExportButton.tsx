"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui";
import { api } from "@/lib/api/client";

interface ExportButtonProps {
  type?: "savings-report" | "transactions";
  className?: string;
}

export function ExportButton({ type = "savings-report", className }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/export/${type === "savings-report" ? "savings-report" : "transactions"}`);

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Export failed");
      }

      // Convert to JSON and download
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `powernetpro-${type}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Log activity (non-blocking)
      import("@/lib/activity").then(({ activityLogs }) => {
        activityLogs.profileUpdated(["export", type]);
      }).catch(() => {
        // Ignore activity logging errors
      });

      toast.success("Report exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to export report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="md"
      onClick={handleExport}
      isLoading={loading}
      leftIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      className={className}
    >
      {loading ? "Exporting..." : "Export Report"}
    </Button>
  );
}

