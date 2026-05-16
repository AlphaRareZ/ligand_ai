import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function startAnalysis(
    router: AppRouterInstance,
    setIsLoading?: (val: boolean) => void,
) {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    
    try {
        if (setIsLoading) setIsLoading(true);

        // 1. جرب تجيب بيانات اليوزر
        const meResponse = await fetch(`${baseUrl}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (meResponse.ok) {
            await router.replace("/lab");
            return; // اخرج فوراً ومتخليش الـ Loading يقفل عشان ملمحش الصفحة القديمة
        }

        // 2. لو مفيش، جرب الـ Refresh
        const refreshResponse = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            await router.replace("/lab");
            return;
        }

        // 3. لو كله فشل، روح للـ Sign in
        await router.replace("/sign-in");
        if (setIsLoading) setIsLoading(false); // اقفل الـ loading لو خلاص مفيش نقل وهيقف في الـ sign-in

    } catch (error) {
        console.error("Routing error:", error);
        await router.replace("/sign-in");
        if (setIsLoading) setIsLoading(false);
    }
}