<template>
    <div class="container">
        <div v-if="profile.user">
            <p>
                Full name: {{ fullName }}
            </p>
            <p>
                Email: {{ email }}
            </p>
        </div>
        <div v-if="profile.error">
            Oops an error occured
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { State, Action, Getter } from 'vuex-class';
    import { ProfileState, User } from '../store/profile/types';
    const namespace: string = 'profile';

    @Component
    export default class UserDetail extends Vue {
        @State('profile') public profile!: ProfileState;
        @Action('fetchData', { namespace }) public fetchData!: any;
        @Getter('fullName', { namespace }) public fullName!: string;

        public mounted() {
            // fetching data as soon as the component's been mounted
            this.fetchData();
        }

        // computed variable based on user's email
        get email() {
            const user = this.profile && this.profile.user;
            return (user && user.email) || '';
        }
    }
</script>
