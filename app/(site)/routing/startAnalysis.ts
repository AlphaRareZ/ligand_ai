import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function startAnalysis(router: AppRouterInstance) {
    try {
        // 1. Check if user is already authenticated
        const meResponse = await fetch("https://auth.aml2ligand.online/api/auth/me", {
            method: "GET",
            credentials: "include", // CRITICAL: Tells the browser to attach the HttpOnly cookies
        });

        if (meResponse.ok) {
            router.push("/lab");
            return;
        }

        // 2. If unauthorized, attempt to refresh the token
        const refreshResponse = await fetch("https://auth.aml2ligand.online/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            router.push("/lab");
            return;
        }

        // 3. If everything fails, route to sign in
        router.push("/sign-in");
    } catch (error) {
        console.error("Routing error:", error);
        router.push("/sign-in");
    }
}
