<script>
    export let day, regist, cx, inputFocus, script, idx, addInput, focusing, removeInput

    let input
</script>

<p class="input">
    <input 
        type="text"
        autocomplete="off"
        bind:value={script.text}
        bind:this={input}
        on:change={regist(day, idx, input)}
        on:keydown={e => {
            if(e.key == 'Enter' && script.text != ''){
                addInput(day)
            } else if(e.key == 'Backspace'){
                if(script.text == '' && day.script.length > 1) removeInput(day, script)
            }
        }}
        on:focus={focusing(day, idx)}
        class="{cx({done: script.done})}"
        use:inputFocus
    >
</p>