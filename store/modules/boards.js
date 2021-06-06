export const state = () => ({
    boards: [
        { name: "cars", images: [] },
        { name: "houses", images: [] },
        { name: "vacation", images: [] }
    ]
})

export const actions = {
    async load({ state }) {
        const cloudName = this.$config.cloudinaryCloudName;

        const axios = this.$axios;

        const boards = state.boards;

        for (const index in boards) {

            const url = `http://res.cloudinary.com/${cloudName}/image/list/${boards[index].name}.json`;

            const images = await axios.$get(url);

            boards[index].images = images.resources;

        }

        state.boards = boards;
    }
}
