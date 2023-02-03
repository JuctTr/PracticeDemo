import TextInput from './components/TextInput/index.js';

const { createApp } = Vue;

createApp({
    components: {
        TextInput,
    },
    data() {
        return {
            message: 'Hello Vue!',
        };
    },
}).mount('#app');
