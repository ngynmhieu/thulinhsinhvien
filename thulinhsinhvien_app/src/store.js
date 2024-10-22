import { defineStore } from "pinia";

export const useConstantStore = defineStore('contestantStore',{
    state: () => ({
        currentContestant: 0,
        contestantsOrder : [
            { path: 'ngoc-quy', name: 'ngocquy' },
            { path: 'hai-yen', name: 'haiyen' },
            { path: 'hoai-nam', name: 'hoainam' },
            { path: 'dinh-phong', name: 'dinhphong' },
            { path: 'thao-vi', name: 'thaovi' },
            { path: 'hoai-khanh', name: 'hoaikhanh' }
        ],
    }),
    actions: {
        setCurrentContestant(newContestant) {
            this.currentContestant = newContestant;
        }
    },
})