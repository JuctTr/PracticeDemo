import GrandChildren from './GrandChildren.js';

const sys = Symbol.for('sys');

export default {
    name: 'Children',
    props: {
        v2point2point1: {
            default() {
                return this.bar;
            },
        },
    },
    // inject: ['foo'],
    inject: {
        foo: 'foo',
        sys: sys,
        bar: 'bar',
    },
    components: {
        GrandChildren,
    },
    template: `
        <div>
            <h1>我是子组件</h1>
            {{this.foo}}
            {{this.sys}}
            <p>tips: fromProvidebyProps</p>
            {{this.v2point2point1}}
            {{this.fromProvidebyProps}}
            <GrandChildren></GrandChildren>
        </div>
    `,
    data() {
        return {
            fromProvidebyProps: this.v2point2point1,
        };
    },
};
