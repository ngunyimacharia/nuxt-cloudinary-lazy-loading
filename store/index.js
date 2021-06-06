export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('modules/boards/load')
    }
}