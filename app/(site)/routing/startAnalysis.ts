import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function startAnalysis(
    router: AppRouterInstance,
    SetIsLoading?: (val: boolean) => void,
) {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    try {
        if (SetIsLoading) SetIsLoading(true); // ابدأ الـ Loading هنا

        // 1. جرب تجيب بيانات اليوزر
        const meResponse = await fetch(`${baseUrl}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (meResponse.ok) {
            router.replace("/lab"); // استخدم replace بدل push عشان الـ Back button
            return;
        }

        // 2. لو مفيش، جرب الـ Refresh
        const refreshResponse = await fetch(`${baseUrl}/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            router.replace("/lab");
            return;
        }

        // 3. لو كله فشل، روح للـ Sign in
        router.replace("/sign-in");
    } catch (error) {
        console.error("Routing error:", error);
        router.replace("/sign-in");
    } finally {
        // لو مش هتعمل Redirect، اقفل الـ Loading
        // بس بما إننا بنعمل Redirect في كل الحالات، الصفحة الجديدة هي اللي هتحمل
    }
}
