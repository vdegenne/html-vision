export async function sleep(timeoutMs: number) {
	return new Promise((r) => setTimeout(r, timeoutMs));
}
