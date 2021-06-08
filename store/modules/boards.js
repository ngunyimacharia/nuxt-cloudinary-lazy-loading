export const state = () => ({
    boards: [
        { name: "cars", images: [], videos: [] },
        { name: "houses", images: [], videos: [] },
        { name: "vacation", images: [], videos: [] }
    ]
})

export const actions = {
    async load({ state }) {
        const cloudName = this.$config.cloudinaryCloudName;

        const axios = this.$axios;

        const boards = state.boards;

        for (const index in boards) {

            const imageUrl = `http://res.cloudinary.com/${cloudName}/image/list/${boards[index].name}.json`;

            const images = await axios.$get(imageUrl);

            boards[index].images = images.resources;

            const videoUrl = `http://res.cloudinary.com/${cloudName}/video/list/${boards[index].name}.json`;

            console.log(videoUrl);

            const videos = await axios.$get(videoUrl);

            console.log(videos);

            boards[index].videos = videos.resources;

        }

        state.boards = boards;
    }
}
