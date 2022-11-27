const sys = Symbol.for('sys');

export default {
    name: 'GrandChildren',
    // inject: ['foo'],
    inject: {
        foo: 'foo',
        sys: sys,
    },
    template: `
        <div>
            <h2>我是孙子组件</h2>
            {{this.foo}}
            {{this.sys}}
        </div>
    `,
    data() {
        return {};
    },
};
