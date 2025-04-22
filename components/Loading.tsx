

import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function Loading() {

    const { isLoading } = useAuth()
    if (!isLoading) return null
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">Loading, please wait...</p>
            </div>
        </div>
    );
}
