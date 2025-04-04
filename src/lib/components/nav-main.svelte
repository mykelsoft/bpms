<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';

	const { items } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			{#each items as item}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props }: { props: any })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
