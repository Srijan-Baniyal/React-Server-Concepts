import { ImageResponse } from "next/og";

export function get() {
	return new ImageResponse(<div>KG- Builder</div>);
}
