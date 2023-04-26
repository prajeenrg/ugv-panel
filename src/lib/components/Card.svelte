<script lang="ts">
    export let heading: string;
    export let desc: string;
    export let src: string;
</script>

<div class="card">
    <img {src} alt="{heading}">
    <div class="content">
        <p class="heading">{heading}</p>
        <p class="desc">{desc}</p>
    </div>
</div>

<style>
    .card {
        display: grid;
        grid-template-columns: 1fr 3fr;
        background-color: white;
        border-radius: 8px;
        height: 100%;
        width: 100%;
        overflow: hidden;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    }

    .card img {
        background-color: hsl(237, 100%, 87%);
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1em;
        font-size: 16px;
    }

    .heading {
        font-weight: 600;
    }

    .desc {
        padding-top: 4px;
    }
</style>