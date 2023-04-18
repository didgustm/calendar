<script>
    import Input from "./Input.svelte";
    import Check from "./Check.svelte";

    export let day, regist, complete, cx, inputFocus, scripts, addInput, focusing, removeInput
</script>

<div class="form">
    <div class="select_date">
        {day.num.getFullYear()}. {day.num.getMonth()+1}. {day.num.getDate()}
    </div>
    {#each scripts as script, idx}
    <Input {day} {script} {idx} {regist} {cx} {inputFocus} {addInput} {focusing} {removeInput} />
    {/each}
    <Check {day} {complete} />
</div>