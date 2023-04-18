<script>
    export let day, thisMonth, cx, openForm, closeForm, scripts, solarHolidays, transferLunar, solarHoliName, lunarHoliName
</script>

<button
    type="button"
    class="{cx( 
        {today: day.num.getFullYear() == thisMonth.getFullYear() && day.num.getMonth() == thisMonth.getMonth() && day.num.getDate() == thisMonth.getDate()}, 
        {disabled: !day.enabled},
        {holiday: solarHolidays.includes(day.utcDate) || transferLunar.includes(day.utcDate) || transferLunar[0] - 1 == day.utcDate}
    )}"
    on:click={closeForm(day)}
    on:dblclick={openForm(day)}
>
    {#if solarHolidays.indexOf(day.utcDate) != -1}
    {day.num.getDate()} {solarHoliName[solarHolidays.indexOf(day.utcDate)]}
    {:else if transferLunar.indexOf(day.utcDate) != -1}
    {day.num.getDate()} {lunarHoliName[transferLunar.indexOf(day.utcDate)]}
    {:else}
    {day.num.getDate()}
    {/if}
    {#if day.enabled}
        {#each scripts as script}
            {#if script.text != ''}
            <p class="{cx('text', {done: script.done})}">{script.text}</p>
            {/if}
        {/each}
    {/if}
</button>