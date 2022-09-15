import React from 'react';

interface IPageConfig {
    d: number;
    e: boolean;
    f: string;
}

export function PageConfig(config: IPageConfig) {
    return Component => {
        const newConfig = Object.assign(
            {
                a: 1,
                b: 2,
                c: 3,
            },
            config
        );

        const { d, e, f } = newConfig;

        Component = checkNetworkDecorator(Component);

        /**
         * 为组件渲染新增一些公共逻辑
         */
        const componentDidMount = Component.prototype.componentDidMount;
        Component.prototype.componentDidMount = function () {
            console.log('【装饰器】componentWillMount => ', '公共逻辑');
            componentDidMount?.call?.(this);
        };

        return Component;
    };
}

function checkNetworkDecorator(Component) {
    const componentDidMount = Component.prototype.componentDidMount;
    const render = Component.prototype.render;
    Component.prototype.componentDidMount = function () {
        try {
            const offline = true;
            if (offline) {
                this.setState({
                    isOffline: true,
                });
            } else {
                componentDidMount?.call(this);
            }
        } catch (e) {
            console.error(e);
        }
    };
    Component.prototype.render = function () {
        const { isOffline } = this.state;
        return <div>{isOffline ? '网络出错～～～' : render?.call(this)}</div>;
    };
    return Component;
}
