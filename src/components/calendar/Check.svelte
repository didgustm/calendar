<script>
    import check from "@images/check.png";

    export let day, complete
</script>

<label>
    <input type="checkbox" on:change={complete(day)}>
    <span>
        <img src="{check}" alt="">
    </span>
</label>