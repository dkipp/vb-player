<template>
    <div class="container">
        <tag-editor v-for="tagId in tagging.currentTagIds" :key="tagId" :tag-id="tagId" style="margin:1em 0" />
    </div>
</template>

<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { State, Action, Getter } from 'vuex-class';
    import { TaggingState, Tag } from '../store/tagging/types';

    import TagEditor from '@/components/TagEditor.vue';

    @Component({
        components: {
            TagEditor,
        },
    })
    export default class ActiveCues extends Vue {
        @State('tagging') public tagging!: TaggingState;
    }
</script>
