import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: { //храним данные, массив эпизодов
        episodes: [],

        single_episode: [],

        arr_episodes: [], 

        character: []
    },

    getters: { 
        EPISODES: state => {
            return state.episodes
        },
        SINGLE_EPISODE: state => {
            return state.single_episode
        },
        ARR_EPISODES: state => {
            return state.arr_episodes
        },
        CHARACTER: state => {
            return state.character
        }
    },

    mutations: { 
        SET_EPISODES: (state, payload) => {
            state.episodes.push(...payload);
        },
        SET_SINGLE_EPISODE: (state, payload) => {
            state.single_episode = payload;
        },
        SET_ARR_EPISODES: (state, payload) => {
            state.arr_episodes = payload;
        },
        SET_CHARACTER: (state, payload) => {
            state.character = payload;
        }
    },

    actions: {
        async doUpdateEpisodes(context){
            await axios.get('https://rickandmortyapi.com/api/episode')
                .then(async (main) => {
                    context.commit('SET_EPISODES', main.data.results)
                    for (let i = 2; i <= main.data.info.pages; i++) {
                        await axios.get('https://rickandmortyapi.com/api/episode?page=' + i)
                            .then((res) => {
                                context.commit('SET_EPISODES', res.data.results)
                            })
                    }
                })
        },
        SET_EPISODES: async (context, page) => {
            try {
                let {data} = await axios.get('https://rickandmortyapi.com/api/episode?page=' + page)
                if (data) {
                    context.commit('SET_EPISODES', data.results)
                } else {
                    alert(`Ошибка в data`);
                }
            } catch(error) {
                console.log('error')
            }
        },
        SET_SINGLE_EPISODE: async (context, id) => {
            try {
                let {data} = await axios.get('https://rickandmortyapi.com/api/episode/'+id)
                if (data) {
                    context.commit('SET_SINGLE_EPISODE', data)
                } else {
                    alert(`Ошибка в data`);
                }
            } catch(error) {
                console.log('error в сингле')
            }
        },
        SET_ARR_EPISODES: async (context, id) => {
            try {
                let {data} = await axios.get('https://rickandmortyapi.com/api/episode/'+id)
                if (data) {
                    context.commit('SET_ARR_EPISODES', data)
                } else {
                    alert(`Ошибка в ARR`);
                }
            } catch(error) {
                console.log('error в ARR')
            }
        },
        SET_CHARACTER: async (context, id_character) => {
            try {
                let {data} = await axios.get(id_character)
                console.log(id_character)
                if (data) {
                    context.commit('SET_CHARACTER', data)
                } else {
                    alert(`Ошибка в CHARACTER`);
                }
            } catch(error) {
                console.log('error in CHARACTER')
            }
        },
    }, 
    modules: {}
})