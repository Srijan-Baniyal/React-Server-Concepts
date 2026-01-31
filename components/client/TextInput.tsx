/**
 * Client Component for Text Input with React Hook Form + Zod + React Query
 * Demonstrates best practices with form validation and mutations
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processTextSchema, type ProcessTextInput } from "@/lib/validations/graph";
import { useProcessText } from "@/hooks/use-graph";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";

export default function TextInput() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ProcessTextInput>({
		resolver: zodResolver(processTextSchema),
		defaultValues: {
			text: "",
		},
	});

	const processTextMutation = useProcessText();

	const onSubmit = async (data: ProcessTextInput) => {
		try {
			await processTextMutation.mutateAsync(data);
			// Reset form on success
			reset();
		} catch (error) {
			// Error is handled by the mutation's onError callback
			console.error("Form submission error:", error);
		}
	};

	return (
		<Card className="p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Field>
					<FieldLabel htmlFor="text-input">Enter your text</FieldLabel>
					<FieldContent>
						<Textarea
							id="text-input"
							{...register("text")}
							placeholder="Type or paste your text here. The knowledge graph will be built in real-time..."
							rows={10}
							className="resize-none"
							aria-invalid={!!errors.text}
						/>
						{errors.text && (
							<FieldError errors={[errors.text]} />
						)}
						<FieldDescription>
							The system will extract entities and relationships as you type.
						</FieldDescription>
					</FieldContent>
				</Field>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={isSubmitting || processTextMutation.isPending}
				>
					{isSubmitting || processTextMutation.isPending
						? "Building Graph..."
						: "Build Knowledge Graph"}
				</Button>
			</form>
		</Card>
	);
}
