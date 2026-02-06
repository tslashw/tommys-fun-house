<script>
    let selectedNavItem = "games";
</script>


<div class="app">

    <div class="title">
        <h1>Tommy's Fun House</h1>
        <span>
            
            <button onclick={() => (selectedNavItem = "games")} class:selected={selectedNavItem === "games"} style="color: #3c5e8b">
                Games
            </button>
            
            <button onclick={() => (selectedNavItem = "about")} class:selected={selectedNavItem === "about"} style="color: #25562e">
                About
            </button>
            
        </span>
    </div>
    
    <div 
        class="content" 
        class:games={selectedNavItem === "games"}
        class:about={selectedNavItem === "about"}
    >

    {#if selectedNavItem === "games"}
        <a href="/blackjack-tycoon/"><h1>BLACKJACK TYCOON</h1></a>
    {:else if selectedNavItem === "about"}
        <h1>ABOUT</h1>
    {/if}

    </div>
    

</div>



<style>

    .app {
        min-height: 100dvh;
        height: 100dvh;
        box-sizing: border-box;
        overflow: hidden;
        
        background-color: #ead4aa;

        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        flex-direction: column;
        gap: 0;
        align-items: center;
    }

    .title h1 {
        font-family: var(--title-font);
        font-size: clamp(2rem, 5vw, 8rem);
        line-height: 1;
        color: #da863e;
        text-shadow: 3px 3px black;

        padding: 0;
        margin: 0;

    }

    .title span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2vw;

        margin: 1vh 0 1vh 0;
        padding: 0;
    }

    .title span button {
        background: none;
        border: none;
        margin: 0;
        font-family: var(--main-font);
        font-size: clamp(1rem, 3vw, 3rem);
        line-height: 1;
        font-weight: 900;

    }

    .title span button.selected {

    }

    .title span button:hover {
        cursor: pointer;
        animation: jiggle 250ms ease-in-out infinite;
    }

    @keyframes jiggle {
        0% {

        }
        50% {
            transform: rotateZ(3deg);
        }
        100% {
            transform: rotateZ(-3deg);
        }
    }



    .content {
        flex: 0.98;
        width: 65%;
        align-self: center;

        border: solid max(3px, 0.1vw) #090a14;
        border-radius: 0.25vw;
        
        background-color: #e7d5b3;

        display: flex;
    }
    .content.games {
        border-color: #3c5e8b;
    }
    .content.about {
        border-color: #25562e;
    }
</style>