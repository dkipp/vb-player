<template>
    <div v-if="tag">
      <h3 style="margin-bottom: 1em">Tag id: {{tagId}} <small>{{tag.data}}</small></h3>

      <table v-for="(cat) in tagConfig" :key="cat.label" style="width:100%; margin-bottom: 1em">
        <caption style="font-weight:bold; text-align:left; margin-bottom: .5em">{{cat.label}}</caption>
        <tr v-for="(item) in cat.bits" :key="item.bit">
          <td><input type="checkbox" :checked="(tag.data) & (1 << item.bit)" @click="onCBClick($event, item.bit)"/> {{(item.label)}}</td>
        </tr>

        <!--
          not working...
          tr v-for="r in Math.ceil(cat.bits.length / cat.cols)" :key="r">
          <td v-for="c in cat.cols" :key="c">{{tagConfig[cIdx].bits[(c-1)+(r-1)*cat.cols].label}}</td>
        </tr-->
      </table>

    </div>
</template>

<script lang="ts">

  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';
  import { TaggingState, Tag } from '../store/tagging/types';

  @Component
  export default class TagEditor extends Vue {

    @Prop({default: ''}) public tagId!: string;

    @State('tagging') public tagging!: TaggingState;
    @Getter('getTagById', { namespace: 'tagging' }) public getTagById!: any;
    @Mutation('toggleTagBit', { namespace: 'tagging' }) public toggleTagBit!: any;

    /* data */
    public tag: Tag|null = null;

    // public idx: number = 0;
    public tagConfig = [
      {
        label: 'Wer',
        bits: [
          {bit: 0, label: 'Wir'},
          {bit: 1, label: 'Gegner'},
          {bit: 3, label: 'Schiri'},
        ],
        cols: 3,
      }, {
        label: 'Was - Spielsituation',
        bits: [
          {bit: 5, label: 'Aufschlag'},
          {bit: 6, label: 'Annahme'},
          {bit: 7, label: 'Zuspiel'},
          {bit: 8, label: 'Angriff'},
          {bit: 9, label: 'Block'},
          {bit: 10, label: 'Dankeball'},
        ],
        cols: 2,
      }, {
        label: 'Wie - Technik',
        bits: [
          {bit: 15, label: 'Oberes Zuspiel'},
          {bit: 16, label: 'Unteres Zuspiel'},
          {bit: 17, label: 'Angriffsschlag'},
        ],
        cols: 2,
      },
    ];

    public mounted() {
      this.tag = this.getTagById( this.tagId );
    }

    public onCBClick(e: Event, bit: number) {
      e.preventDefault();
      this.toggleTagBit({id: this.tagId, bit});
    }

  }
</script>
