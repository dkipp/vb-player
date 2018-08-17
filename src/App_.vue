<template>
  <v-app>
    <v-navigation-drawer
      dark
      persistent
      mini-variant
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list dense>
        
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.route"
        >
          <v-list-tile-action>
            <v-icon x-large v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dense
      app
    >
      <!--_v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon>
        <v-icon v-html="true ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon >
        <v-icon>remove</v-icon>
      </v-btn-->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <!--v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer-->
  </v-app>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import { MenuItem } from '@/interfaces';

  @Component({
    components: {
      HelloWorld,
    },
  })

  export default class App extends Vue {
    @Prop() private drawer!: boolean;
    @Prop({ default: false }) private fixed!: boolean;
    @Prop() private items!: MenuItem[];
    @Prop({ default: 'App Title'}) private title!: string;

    private mounted() {
      this.items = [
        {icon: 'video_library', title: 'item 4', route: '/'},
        {icon: 'video_library', title: 'item 2', route: '/about'},
        {icon: 'video_library', title: 'item 3', route: '/player'},
        // {icon: 'video_library', title: 'item 4'},
      ];
    }
  }
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #161616;
}

</style>
