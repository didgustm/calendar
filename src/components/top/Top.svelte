<script>
    import Info from "./Info.svelte";
    import nextIcon from "@images/next.png";
    export let year, month, prev, next
</script>

<div class="top semi">
    <button 
    type="button" 
    class="prev"
    on:click={prev}
    >
        <img src="{nextIcon}" alt="">
    </button>
    <Info {year} {month} />
    <button 
    type="button" 
    class="next"
    on:click={next}
    >
        <img src="{nextIcon}" alt="">
    </button>
</div>