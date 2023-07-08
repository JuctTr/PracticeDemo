import createApp from './base'

export default context => {
    const { app } = createApp(context);
    return app;
}