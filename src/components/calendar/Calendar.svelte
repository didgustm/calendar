<script>
    import Dates from "./Dates.svelte";
    import Form from "./Form.svelte";
    
    export let days, thisMonth, cx, solarHolidays, transferLunar, solarHoliName, lunarHoliName

    function openForm(row){
        //days.filter(t => t.edit = false);
        row.edit = true;
        days = days;
    }
    function closeForm(row){
        days.filter(t => t.edit? t.edit = false: t.edit = t.edit);
        row.edit = false;
        days = days;
    }
    function regist(row, idx, input){
        row.script[idx].text = input.value;
        days = days
    }
    function addInput(row){
        let script = {
            text: '',
            done: false
        }
        row.script = [...row.script, script];
        days = days
    }
    function removeInput(row, script){
        row.script = row.script.filter(t => t !== script);
        days = days
    }
    function focusing(row, idx){
        row.script.filter(t => t.active = false)
        row.script[idx].active = true
        days = days;
    }
    function complete(row){
        row.script.filter(t => {
            if(t.active && t.text != '') t.done = !t.done
        })
        days = days
    }

    const inputFocus = (element) => {
        element.focus();
    }
</script>

<div class="calendar">
    <div class="month_wrap">
        {#each days as day}
        <div class="date">
            <Dates {day} scripts={day.script} {thisMonth} {cx} {openForm} {closeForm} {solarHolidays} {transferLunar} {solarHoliName} {lunarHoliName} />
            {#if day.edit && day.enabled}
            <Form {day} scripts={day.script} {regist} {complete} {cx} {inputFocus} {addInput} {focusing} {removeInput} />
            {/if}
        </div>
        {/each}
    </div>
</div>