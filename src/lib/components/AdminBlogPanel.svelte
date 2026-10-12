<script lang="ts">
	import BlogContentRenderer from '$lib/components/BlogContentRenderer.svelte';
	import ImageUploadTool from '$lib/components/ImageUploadTool.svelte';
	import { type BlogLink, type BlogPost, createEmptyBlogPost, normalizeSlug } from '$lib/blog';

	let {
		initialPosts,
		blobConfigured
	}: {
		initialPosts: BlogPost[];
		blobConfigured: boolean;
	} = $props();

	interface FormState {
		originalSlug: string | null;
		slug: string;
		title: string;
		excerpt: string;
		publishedAt: string;
		themes: string;
		introduction: string;
		content: string;
		bibliography: BlogLink[];
		usefulLinks: BlogLink[];
	}

	function toFormState(post: BlogPost): FormState {
		return {
			originalSlug: post.slug || null,
			slug: post.slug,
			title: post.title,
			excerpt: post.excerpt,
			publishedAt: post.publishedAt,
			themes: post.themes.join(', '),
			introduction: post.introduction,
			content: post.content,
			bibliography:
				post.bibliography.length > 0 ? [...post.bibliography] : [{ label: '', href: '' }],
			usefulLinks: post.usefulLinks.length > 0 ? [...post.usefulLinks] : [{ label: '', href: '' }]
		};
	}

	function toPayload(f: FormState) {
		return {
			slug: f.slug,
			title: f.title,
			excerpt: f.excerpt,
			publishedAt: f.publishedAt,
			themes: f.themes
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean),
			introduction: f.introduction,
			content: f.content,
			bibliography: f.bibliography,
			usefulLinks: f.usefulLinks
		};
	}

	// svelte-ignore state_referenced_locally
	let posts = $state<BlogPost[]>(initialPosts);
	// svelte-ignore state_referenced_locally
	let selectedSlug = $state<string | null>(initialPosts[0]?.slug ?? null);
	// svelte-ignore state_referenced_locally
	let form = $state<FormState>(toFormState(initialPosts[0] ?? createEmptyBlogPost()));
	let message = $state<string | null>(null);
	let error = $state<string | null>(null);
	let showImageUploader = $state(false);
	let activeTab = $state<'editor' | 'preview'>('editor');
	let isPending = $state(false);
	let contentTextarea = $state<HTMLTextAreaElement | null>(null);

	const sortedPosts = $derived(
		[...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
	);

	function handleNewPost() {
		selectedSlug = null;
		message = null;
		error = null;
		form = toFormState(createEmptyBlogPost());
	}

	function handleSelectPost(post: BlogPost) {
		selectedSlug = post.slug;
		message = null;
		error = null;
		form = toFormState(post);
	}

	function handleTitleInput(value: string) {
		form.title = value;
		if (!form.originalSlug) {
			form.slug = normalizeSlug(value);
		}
	}

	function addLinkRow(section: 'bibliography' | 'usefulLinks') {
		form[section] = [...form[section], { label: '', href: '' }];
	}

	function removeLinkRow(section: 'bibliography' | 'usefulLinks', index: number) {
		if (form[section].length === 1) {
			form[section] = [{ label: '', href: '' }];
		} else {
			form[section] = form[section].filter((_, i) => i !== index);
		}
	}

	async function refreshPosts() {
		const response = await fetch('/api/admin/blog/posts', { cache: 'no-store' });
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error ?? 'Failed to refresh posts.');
		}
		const nextPosts = data.posts as BlogPost[];
		posts = nextPosts;
		if (selectedSlug) {
			const nextSelected = nextPosts.find((p) => p.slug === selectedSlug);
			if (nextSelected) {
				form = toFormState(nextSelected);
			}
		}
	}

	async function handleSave() {
		message = null;
		error = null;
		isPending = true;

		try {
			const isEditing = Boolean(form.originalSlug);
			const endpoint = isEditing
				? `/api/admin/blog/posts/${form.originalSlug}`
				: '/api/admin/blog/posts';
			const method = isEditing ? 'PUT' : 'POST';

			const response = await fetch(endpoint, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(toPayload(form))
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error ?? 'Failed to save post.');
			}

			const savedPost = data.post as BlogPost;
			await refreshPosts();
			selectedSlug = savedPost.slug;
			form = toFormState(savedPost);
			message = isEditing ? 'Post updated successfully.' : 'Post created successfully.';
		} catch (saveError) {
			error = saveError instanceof Error ? saveError.message : 'Failed to save post.';
		} finally {
			isPending = false;
		}
	}

	async function handleDelete() {
		if (!form.originalSlug) return;
		if (!window.confirm(`Delete "${form.title}"?`)) return;

		message = null;
		error = null;
		isPending = true;

		try {
			const response = await fetch(`/api/admin/blog/posts/${form.originalSlug}`, {
				method: 'DELETE'
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error ?? 'Failed to delete post.');
			}

			const remaining = posts.filter((p) => p.slug !== form.originalSlug);
			posts = remaining;
			if (remaining[0]) {
				selectedSlug = remaining[0].slug;
				form = toFormState(remaining[0]);
			} else {
				handleNewPost();
			}
			message = 'Post deleted successfully.';
		} catch (deleteError) {
			error = deleteError instanceof Error ? deleteError.message : 'Failed to delete post.';
		} finally {
			isPending = false;
		}
	}

	function insertImageMarkdownAtCursor(markdown: string) {
		if (!contentTextarea) {
			form.content = form.content.trim() ? `${form.content.trim()}\n\n${markdown}` : markdown;
		} else {
			const start = contentTextarea.selectionStart ?? form.content.length;
			const end = contentTextarea.selectionEnd ?? form.content.length;
			const before = form.content.slice(0, start);
			const after = form.content.slice(end);
			const prefix = before.length > 0 && !before.endsWith('\n\n') ? '\n\n' : '';
			const suffix = after.length > 0 && !after.startsWith('\n') ? '\n\n' : '';
			form.content = `${before}${prefix}${markdown}${suffix}${after}`;
		}
		showImageUploader = false;
		message = 'Image markdown inserted into the article.';
		error = null;
	}
</script>

<div class="grid xl:grid-cols-[320px_1fr]">
	<!-- Sidebar Post List -->
	<aside class="border-b border-hairline bg-paper-elevated p-6 xl:border-b-0 xl:border-r">
		<div class="flex items-center justify-between border-b border-hairline pb-3">
			<h2 class="font-serif text-2xl font-semibold text-ink">Articles</h2>
			<button
				type="button"
				onclick={handleNewPost}
				class="border border-copper bg-copper px-3.5 py-1.5 font-mono text-xs font-medium text-[#FAF7F1] dark:text-[#161412]"
			>
				+ New
			</button>
		</div>

		<div class="mt-4 space-y-2.5">
			{#each sortedPosts as post (post.slug)}
				<button
					type="button"
					onclick={() => handleSelectPost(post)}
					class="w-full border p-3.5 text-left transition-colors {selectedSlug === post.slug
						? 'border-copper bg-copper-soft'
						: 'border-hairline-strong bg-paper-card hover:border-copper'}"
				>
					<div class="font-mono text-xs text-copper">{post.publishedAt}</div>
					<div class="mt-1 font-serif text-lg font-semibold text-ink">{post.title}</div>
					<p class="mt-1 line-clamp-2 text-xs text-ink-muted">{post.excerpt}</p>
				</button>
			{/each}

			{#if sortedPosts.length === 0}
				<p class="border border-dashed border-hairline-strong bg-paper-card p-4 font-mono text-xs text-ink-muted">
					No posts yet. Create the first article using the editor.
				</p>
			{/if}
		</div>
	</aside>

	<!-- Main Editor / Preview Section -->
	<section class="bg-paper-card p-6 sm:p-10">
		{#if !blobConfigured}
			<div class="mb-6 border border-copper bg-copper-soft px-4 py-3 font-mono text-xs text-ink">
				CRUD actions require BLOB_READ_WRITE_TOKEN to be configured in the environment.
			</div>
		{/if}

		{#if message || error}
			<div
				class="mb-6 border px-4 py-3 font-mono text-xs {error
					? 'border-copper bg-copper-soft text-copper'
					: 'border-hairline-strong bg-paper-elevated text-ink'}"
			>
				{error ?? message}
			</div>
		{/if}

		<div class="mb-6 flex flex-wrap gap-2 border-b border-hairline pb-4">
			<button
				type="button"
				onclick={() => (activeTab = 'editor')}
				class="border px-4 py-2 font-mono text-xs uppercase tracking-wider {activeTab === 'editor'
					? 'border-copper bg-copper text-[#FAF7F1] dark:text-[#161412]'
					: 'border-hairline-strong bg-paper text-ink'}"
			>
				01 // Editor
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'preview')}
				class="border px-4 py-2 font-mono text-xs uppercase tracking-wider {activeTab === 'preview'
					? 'border-copper bg-copper text-[#FAF7F1] dark:text-[#161412]'
					: 'border-hairline-strong bg-paper text-ink'}"
			>
				02 // Live Preview
			</button>
			<button
				type="button"
				onclick={() => (showImageUploader = !showImageUploader)}
				class="border border-hairline-strong bg-paper px-4 py-2 font-mono text-xs uppercase tracking-wider text-copper hover:border-copper"
			>
				{showImageUploader ? 'Hide Image Tool' : '+ Insert Image'}
			</button>
		</div>

		{#if showImageUploader}
			<div class="mb-6">
				<ImageUploadTool
					slug={form.slug}
					{blobConfigured}
					compact={true}
					onUseImage={({ markdown }) => insertImageMarkdownAtCursor(markdown)}
				/>
			</div>
		{/if}

		{#if activeTab === 'editor'}
			<div class="grid gap-4 md:grid-cols-2">
				<label class="flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
					<span>TITLE</span>
					<input
						value={form.title}
						oninput={(e) => handleTitleInput(e.currentTarget.value)}
						class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
					/>
				</label>

				<label class="flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
					<span>SLUG</span>
					<input
						value={form.slug}
						oninput={(e) => (form.slug = normalizeSlug(e.currentTarget.value))}
						class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-mono text-xs text-ink outline-none focus:border-copper"
					/>
				</label>

				<label class="flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
					<span>PUBLISH DATE</span>
					<input
						type="date"
						value={form.publishedAt}
						oninput={(e) => (form.publishedAt = e.currentTarget.value)}
						class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-mono text-xs text-ink outline-none focus:border-copper"
					/>
				</label>

				<label class="flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
					<span>THEMES (COMMA-SEPARATED)</span>
					<input
						value={form.themes}
						oninput={(e) => (form.themes = e.currentTarget.value)}
						placeholder="Distributed Systems, Rust, Backend"
						class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
					/>
				</label>
			</div>

			<label class="mt-4 flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
				<span>EXCERPT</span>
				<textarea
					rows={2}
					value={form.excerpt}
					oninput={(e) => (form.excerpt = e.currentTarget.value)}
					class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
				></textarea>
			</label>

			<label class="mt-4 flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
				<span>INTRODUCTION</span>
				<textarea
					rows={4}
					value={form.introduction}
					oninput={(e) => (form.introduction = e.currentTarget.value)}
					class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-copper"
				></textarea>
			</label>

			<label class="mt-4 flex flex-col gap-1.5 font-mono text-xs font-medium text-ink">
				<span>ARTICLE CONTENT (## Heading, - list, ```code```, ![Alt](url))</span>
				<textarea
					bind:this={contentTextarea}
					rows={14}
					value={form.content}
					oninput={(e) => (form.content = e.currentTarget.value)}
					class="border border-hairline-strong bg-paper px-3.5 py-2.5 font-mono text-xs leading-relaxed text-ink outline-none focus:border-copper"
				></textarea>
			</label>
		{:else}
			<div class="border border-hairline-strong bg-paper p-6 sm:p-8">
				<h3 class="font-serif text-3xl font-semibold text-ink">
					{form.title || 'Untitled Article'}
				</h3>
				<div class="mt-2 font-mono text-xs text-copper">
					{form.publishedAt || 'Unscheduled'} · {form.themes || 'No themes'}
				</div>
				<p class="mt-4 text-base leading-relaxed text-ink-muted">
					{form.introduction || 'Introduction preview...'}
				</p>
				<div class="mt-6 border-t border-hairline pt-6">
					<BlogContentRenderer content={form.content} />
				</div>
			</div>
		{/if}

		<!-- Bibliography & Useful Links -->
		<div class="mt-8 grid gap-6 border-t border-hairline pt-6 xl:grid-cols-2">
			{#each ['bibliography', 'usefulLinks'] as const as section (section)}
				<div>
					<div class="mb-3 flex items-center justify-between">
						<h3 class="font-serif text-xl font-semibold text-ink">
							{section === 'bibliography' ? 'Bibliography' : 'Useful Links'}
						</h3>
						<button
							type="button"
							onclick={() => addLinkRow(section)}
							class="font-mono text-xs font-semibold text-copper hover:underline"
						>
							+ Add Row
						</button>
					</div>

					<div class="space-y-3">
						{#each form[section] as item, index (`${section}-${index}`)}
							<div class="border border-hairline bg-paper p-3.5">
								<div class="grid gap-2 sm:grid-cols-2">
									<input
										value={item.label}
										oninput={(e) => (form[section][index].label = e.currentTarget.value)}
										placeholder="Label"
										class="border border-hairline-strong bg-paper-card px-3 py-2 text-xs text-ink"
									/>
									<input
										value={item.href}
										oninput={(e) => (form[section][index].href = e.currentTarget.value)}
										placeholder="https://..."
										class="border border-hairline-strong bg-paper-card px-3 py-2 font-mono text-xs text-ink"
									/>
								</div>
								<button
									type="button"
									onclick={() => removeLinkRow(section, index)}
									class="mt-2 font-mono text-xs text-copper hover:underline"
								>
									Remove Row
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-8 flex flex-wrap gap-3 border-t border-hairline pt-6">
			<button
				type="button"
				onclick={handleSave}
				disabled={isPending || !blobConfigured}
				class="border border-copper bg-copper px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-[#FAF7F1] disabled:opacity-50 dark:text-[#161412]"
			>
				{isPending ? 'Saving...' : form.originalSlug ? 'Update Post' : 'Create Post'}
			</button>
			<button
				type="button"
				onclick={handleDelete}
				disabled={isPending || !blobConfigured || !form.originalSlug}
				class="border border-hairline-strong bg-paper px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-copper disabled:opacity-50"
			>
				Delete Post
			</button>
		</div>
	</section>
</div>
