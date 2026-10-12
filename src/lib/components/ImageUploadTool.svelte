<script lang="ts">
	let {
		slug = undefined,
		blobConfigured,
		onUseImage = undefined,
		compact = false
	}: {
		slug?: string;
		blobConfigured: boolean;
		onUseImage?: (payload: { alt: string; url: string; markdown: string }) => void;
		compact?: boolean;
	} = $props();

	let selectedFile = $state<File | null>(null);
	let altText = $state('');
	let manualUrl = $state('');
	let uploadedUrl = $state('');
	let message = $state<string | null>(null);
	let error = $state<string | null>(null);
	let isDragActive = $state(false);
	let isUploading = $state(false);

	const activeUrl = $derived(uploadedUrl || manualUrl.trim());
	const activeAlt = $derived(altText.trim() || 'Image');
	const markdown = $derived(activeUrl ? `![${activeAlt}](${activeUrl})` : '');

	async function handleUpload() {
		if (!selectedFile) {
			error = 'Choose an image file before uploading.';
			message = null;
			return;
		}

		error = null;
		message = null;
		isUploading = true;

		try {
			const formData = new FormData();
			formData.append('file', selectedFile);
			if (slug) {
				formData.append('slug', slug);
			}

			const response = await fetch('/api/admin/blog/images', {
				method: 'POST',
				body: formData
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error ?? 'Failed to upload image.');
			}

			uploadedUrl = data.url as string;
			manualUrl = data.url as string;
			if (!altText.trim()) {
				altText = (selectedFile.name || 'image').replace(/\.[^.]+$/, '');
			}
			message = 'Image uploaded to Vercel Blob.';
		} catch (uploadError) {
			error = uploadError instanceof Error ? uploadError.message : 'Failed to upload image.';
		} finally {
			isUploading = false;
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragActive = false;
		const file = event.dataTransfer?.files?.[0] ?? null;
		selectedFile = file;
		if (file) {
			message = `Selected ${file.name}.`;
			error = null;
		}
	}

	function handleUseImage() {
		if (!activeUrl || !onUseImage) return;
		onUseImage({
			alt: activeAlt,
			url: activeUrl,
			markdown
		});
		message = 'Image markdown inserted.';
		error = null;
	}

	async function handleCopy() {
		if (!markdown) return;
		try {
			await navigator.clipboard.writeText(markdown);
			message = 'Markdown copied to clipboard.';
			error = null;
		} catch {
			error = 'Could not copy to clipboard.';
			message = null;
		}
	}

	async function handleCopyUrl() {
		if (!activeUrl) return;
		try {
			await navigator.clipboard.writeText(activeUrl);
			message = 'Image URL copied to clipboard.';
			error = null;
		} catch {
			error = 'Could not copy the image URL.';
			message = null;
		}
	}
</script>

<div class="border border-hairline-strong bg-paper-card p-6 {compact ? '' : 'sm:p-8'}">
	<h3 class="font-serif text-2xl font-semibold text-ink">Upload or Paste Figure Image</h3>
	<p class="mt-2 text-sm leading-relaxed text-ink-muted">
		Upload a local file to Vercel Blob or paste an existing image URL, then copy or insert the
		markdown.
	</p>

	{#if !blobConfigured}
		<div class="mt-4 border border-copper bg-copper-soft px-4 py-3 font-mono text-xs text-ink">
			BLOB_READ_WRITE_TOKEN is required for uploads. You can still paste an existing image URL
			below.
		</div>
	{/if}

	{#if message || error}
		<div
			class="mt-4 border px-4 py-3 font-mono text-xs {error
				? 'border-copper bg-copper-soft text-copper'
				: 'border-hairline-strong bg-paper-elevated text-ink'}"
		>
			{error ?? message}
		</div>
	{/if}

	<div class="mt-5 grid gap-4 md:grid-cols-2">
		<label class="flex flex-col gap-2 font-mono text-xs font-medium text-ink">
			<span>ALT TEXT</span>
			<input
				value={altText}
				oninput={(e) => (altText = e.currentTarget.value)}
				placeholder="Describe the figure"
				class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
			/>
		</label>

		<label class="flex flex-col gap-2 font-mono text-xs font-medium text-ink">
			<span>IMAGE URL</span>
			<input
				value={manualUrl}
				oninput={(e) => {
					manualUrl = e.currentTarget.value;
					uploadedUrl = '';
				}}
				placeholder="https://..."
				class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
			/>
		</label>
	</div>

	<div class="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
		<label
			ondragover={(e) => {
				e.preventDefault();
				isDragActive = true;
			}}
			ondragleave={() => (isDragActive = false)}
			ondrop={handleDrop}
			class="flex flex-1 cursor-pointer flex-col gap-1.5 border border-dashed px-4 py-4 font-mono text-xs transition-colors {isDragActive
				? 'border-copper bg-copper-soft text-copper'
				: 'border-hairline-strong bg-paper text-ink hover:border-copper'}"
		>
			<span class="font-semibold">LOCAL IMAGE FILE</span>
			<span class="text-ink-muted">
				Drag and drop here or click to choose a file.
				{selectedFile ? ` Selected: ${selectedFile.name}` : ''}
			</span>
			<input
				type="file"
				accept="image/*"
				onchange={(e) => (selectedFile = e.currentTarget.files?.[0] ?? null)}
				class="sr-only"
			/>
		</label>

		<button
			type="button"
			onclick={handleUpload}
			disabled={isUploading || !blobConfigured}
			class="border border-copper bg-copper px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-[#FAF7F1] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#161412]"
		>
			{isUploading ? 'Uploading...' : 'Upload to Blob'}
		</button>
	</div>

	{#if markdown}
		<div class="mt-5 border border-hairline bg-paper p-4">
			<label class="block font-mono text-xs font-medium text-ink">
				<span>IMAGE URL</span>
				<input
					readonly
					value={activeUrl}
					class="mt-1.5 w-full border border-hairline bg-paper-card px-3.5 py-2 font-mono text-xs text-ink"
				/>
			</label>
			<label class="mt-3 block font-mono text-xs font-medium text-ink">
				<span>MARKDOWN</span>
				<input
					readonly
					value={markdown}
					class="mt-1.5 w-full border border-hairline bg-paper-card px-3.5 py-2 font-mono text-xs text-ink"
				/>
			</label>
			<div class="mt-4 flex flex-wrap gap-2.5">
				<button
					type="button"
					onclick={handleCopyUrl}
					class="border border-hairline-strong bg-paper-card px-4 py-2 font-mono text-xs text-ink hover:border-copper"
				>
					Copy URL
				</button>
				<button
					type="button"
					onclick={handleCopy}
					class="border border-hairline-strong bg-paper-card px-4 py-2 font-mono text-xs text-ink hover:border-copper"
				>
					Copy Markdown
				</button>
				{#if onUseImage}
					<button
						type="button"
						onclick={handleUseImage}
						class="border border-copper bg-copper px-4 py-2 font-mono text-xs font-medium text-[#FAF7F1] dark:text-[#161412]"
					>
						Insert into Article
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>
