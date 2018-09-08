import { MutationTree } from 'vuex';
import { TaggingState, Tag } from './types';

export const mutations: MutationTree<TaggingState> = {


    addRandomTags(state, payload) {

        for (let i = 0; i < payload.count; i++) {

            let mask = 0;
            // random bitmask stuff
            for (let b = 0; b < 32; b++) {
                // tslint:disable-next-line:no-bitwise
                mask |= Math.round(Math.random()) << b;
            }
            state.tags.push({
                id: (Math.random() + 1).toString(36).substring(2, 12),
                time: Math.random(),
                data: mask,
            });
        }
    },

    setCurrentTagIds(state, payload) {
        state.currentTagIds = payload.Ids;
    },

    toggleTagBit(state, payload) {
        const tag = state.tags.find( (t) => t.id === payload.id );
        if (tag) {
            // tslint:disable-next-line:no-bitwise
            tag.data ^= 1 << payload.bit;
        }
    },
};
