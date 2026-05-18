import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function startAnalysis(
    router: AppRouterInstance,
    setIsLoading?: (val: boolean) => void,
) {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    
    try {
        if (setIsLoading) setIsLoading(true);

        const meResponse = await fetch(`${baseUrl}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (meResponse.ok) {
            await router.replace("/lab");
            return; 
        }

        const refreshResponse = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            await router.replace("/lab");
            return;
        }

        await router.replace("/sign-in");
        if (setIsLoading) setIsLoading(false);
    } catch (error) {
        console.error("Routing error:", error);
        await router.replace("/sign-in");
        if (setIsLoading) setIsLoading(false);
    }
}