import { BestPracticesChecklist } from "@/components/best-practices/BestPracticesChecklist";
import { BestPracticesHero } from "@/components/best-practices/BestPracticesHero";
import { CachingStrategy } from "@/components/best-practices/CachingStrategy";
import { ComponentBoundaries } from "@/components/best-practices/ComponentBoundaries";
import { DataFetchingGuidelines } from "@/components/best-practices/DataFetchingGuidelines";
import { ErrorHandlingBP } from "@/components/best-practices/ErrorHandlingBp";
import { PerformanceOptimizations } from "@/components/best-practices/PerformanceOptimizations";
import { SecurityPractices } from "@/components/best-practices/SecurityPractices";
import { ServerActionsBP } from "@/components/best-practices/ServerActionsBp";
import { StreamingPatterns } from "@/components/best-practices/StreamingPatterns";
import { TypeScriptPatterns } from "@/components/best-practices/TypeScriptPatterns";
import { Separator } from "@/components/ui/separator";

export default function BestPracticesPage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
			<BestPracticesHero />
			<Separator />
			<ComponentBoundaries />
			<Separator />
			<DataFetchingGuidelines />
			<Separator />
			<CachingStrategy />
			<Separator />
			<StreamingPatterns />
			<Separator />
			<ServerActionsBP />
			<Separator />
			<SecurityPractices />
			<Separator />
			<PerformanceOptimizations />
			<Separator />
			<TypeScriptPatterns />
			<Separator />
			<ErrorHandlingBP />
			<Separator />
			<BestPracticesChecklist />
		</div>
	);
}
