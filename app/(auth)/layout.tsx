
import "../globals.css";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full">
            <main className="grow">{children}</main>
        </div>
    );
}
