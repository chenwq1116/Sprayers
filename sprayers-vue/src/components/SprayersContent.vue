<template>
    <div>
        <div v-html="content"></div>
    </div>
</template>

<script>

export default {
    name: 'SprayersContent',
    props: ['content'],

}
</script>
