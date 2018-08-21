<template>
  <div id="app">
    <div id="nav" class="panel">
      <i class="material-icons">face</i>
      
      <router-link to="/"><i class="material-icons">face</i></router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/player">Player</router-link>
    </div>
    <div id="toolbar" class="panel"></div>
    <router-view id="content" class="panel"></router-view>
    <div id="right" class="panel"></div>
    <div id="status" class="panel"></div>
  </div>
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
    @Prop({ default: 'App Title'}) private title!: string;

    get items() {
      return [
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
  display: grid;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  grid-template-columns: minmax(50px, min-content) 1fr minmax(250px, min-content);
  grid-template-rows: 2em auto 2em;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
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

#nav>a{
  margin: .5em 0;
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
