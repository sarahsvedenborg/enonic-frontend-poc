// app/provider.tsx
"use client"; // Mark as a client component

export default function NextAuthSessionProvider({ children }: { children: React.ReactNode }) {
    // For NextAuth v3, we'll use a different approach
    // The useSession hook will work without SessionProvider in v3
    return <>{children}</>;
}