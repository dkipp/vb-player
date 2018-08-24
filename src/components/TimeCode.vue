<template>
    <span>{{timecode}}</span>
</template>

<script lang="js">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';

export default {
    data() {
        return {
            // reactive data property of the component.
            seconds: 0.34,
        };
    },

    computed: {
        timecode() {
            return this.seconds;
            const d = new Date(0);
            d.setSeconds(this.seconds);
            return d.toTimeString();
        },
    },
};

/*
@Component
export default class TimeCode extends Vue {

  @Prop({default: 0}) public seconds!: number;

  get timecode() {
    const t = Timecode(new Date(this.seconds * 1000) );
    return t.toString();
  }
}
*/
</script>