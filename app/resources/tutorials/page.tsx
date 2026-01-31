export default function TutorialPage() {
	return (
		<div className="p-8">
			<h1 className="mb-4 font-bold text-3xl">Tutorial Page</h1>
			<p className="text-lg">
				Welcome to the tutorial page! Here you will find step-by-step guides to
				help you get started with our application.
			</p>
			<ul className="mt-4 list-inside list-disc">
				<li>Step 1: Introduction to the application</li>
				<li>Step 2: Setting up your account</li>
				<li>Step 3: Navigating the dashboard</li>
				<li>Step 4: Utilizing key features</li>
				<li>Step 5: Getting support and resources</li>
			</ul>
		</div>
	);
}
