<script>
    export let fullDay
</script>

<div class="days medium">
{#each fullDay as day}
    <p>{day}</p>
{/each}
</div>