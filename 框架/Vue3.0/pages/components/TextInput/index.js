const { ref } = Vue;

export default {
    setup() {
        const count = ref(0);
        return { count };
    },
    template: `<input type="text" placeholder="What needs to be done?" />`,
};
