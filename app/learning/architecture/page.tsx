import { ArchitectureHero } from "@/components/architecture/ArchitectureHero";
import { ArchitectureSummary } from "@/components/architecture/ArchitectureSummary";
import { BigPicture } from "@/components/architecture/BigPicture";
import { BundleImpact } from "@/components/architecture/BundleImpact";
import { CachingLayers } from "@/components/architecture/CachingLayers";
import { ComponentTree } from "@/components/architecture/ComponentTree";
import { CompositionPatterns } from "@/components/architecture/CompositionPatterns";
import { DataFetchingPatterns } from "@/components/architecture/DataFetchingPatterns";
import { FlightProtocol } from "@/components/architecture/FlightProtocol";
import { HydrationDeepDive } from "@/components/architecture/HydrationDeepDive";
import { RenderingPipeline } from "@/components/architecture/RenderingPipeline";
import { RequestLifecycle } from "@/components/architecture/RequestLifecycle";
import { RouteSegments } from "@/components/architecture/RouteSegments";
import { SerializationBoundary } from "@/components/architecture/SerializationBoundary";
import { ServerActions } from "@/components/architecture/ServerActions";
import { ServerVsClient } from "@/components/architecture/ServerVsClient";
import { StreamingSuspense } from "@/components/architecture/StreamingSuspense";
import { Separator } from "@/components/ui/separator";

export default function ArchitecturePage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
			<ArchitectureHero />
			<Separator />
			<BigPicture />
			<Separator />
			<ServerVsClient />
			<Separator />
			<ComponentTree />
			<Separator />
			<FlightProtocol />
			<Separator />
			<SerializationBoundary />
			<Separator />
			<RenderingPipeline />
			<Separator />
			<RouteSegments />
			<Separator />
			<RequestLifecycle />
			<Separator />
			<CachingLayers />
			<Separator />
			<ServerActions />
			<Separator />
			<StreamingSuspense />
			<Separator />
			<HydrationDeepDive />
			<Separator />
			<BundleImpact />
			<Separator />
			<DataFetchingPatterns />
			<Separator />
			<CompositionPatterns />
			<Separator />
			<ArchitectureSummary />
		</div>
	);
}
