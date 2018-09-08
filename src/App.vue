<template>
  <div id="app">
    <div id="nav" class="panel">
      <i id="logo" class="material-icons" >face</i>
      
      <router-link to="/"><i class="material-icons">home</i></router-link>
      <router-link to="/about"><i class="material-icons">info</i></router-link>
      <router-link to="/player"><i class="material-icons">video_library</i></router-link>
    </div>
    <div id="toolbar" class="panel">
      <button @click="onOpenVideo">Open File</button>
    </div>
    <router-view id="content" class="panel"></router-view>
    <div id="right" class="panel">
      <active-cues></active-cues>
    </div>
    <div id="status" class="panel"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import ActiveCues from '@/components/ActiveCues.vue';
  import { MenuItem } from '@/types';

  import {ipcRenderer} from 'electron';

  @Component({
    components: {
      HelloWorld,
      ActiveCues,
    },
  })
  export default class App extends Vue {

    @Prop() private drawer!: boolean;
    @Prop({ default: false }) private fixed!: boolean;
    @Prop({ default: 'App Title'}) private title!: string;

    get items() {
      return [
        {icon: 'home', title: 'item 4', route: '/'},
        {icon: 'info', title: 'item 2', route: '/about'},
        {icon: 'video_library', title: 'item 3', route: '/player'},
        // {icon: 'video_library', title: 'item 4'},
      ];
    }

    public onOpenVideo() {
      ipcRenderer.send('open-file-dialog', 'true');
    }
  }
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: grid;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  grid-template-columns: minmax(50px, min-content) 1fr minmax(350px, min-content);
  grid-template-rows: 2em auto 2em;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  color: #acacac;
  background: #161616;
}

.panel{
  background: #232323;
  _border: 1px solid rgb(13, 163, 20);
}

#content {
  grid-area: 2/2/-2/-2;
}

#nav{
  grid-area: 1/1/-1/1;
  display: flex;
  flex-direction: column;
  text-align: center;
}

#nav #logo{
  color: #cc0b8c;
  margin-top: .1em;
  font-size: 36px;
}

#nav>a{
  margin: .5em 0;
  color: #acacac;
}

#nav>a.router-link-exact-active {
  color: #FFF;
}

#right {
  grid-area: 2/-2/-1/-1;
}

#status {
  grid-area: -2/2/-1/-2;
}

#toolbar{
  grid-area: 1/2/2/-1;
}

</style>
