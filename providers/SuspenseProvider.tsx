import { Suspense, type ReactNode } from "react";

interface SuspenseProviderProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export function SuspenseProvider({
	children,
	fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>,
}: SuspenseProviderProps) {
	return <Suspense fallback={fallback}>{children}</Suspense>;
}
