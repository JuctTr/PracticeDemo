import { PageConfig } from './decorator';

@PageConfig({
    d: 1,
    e: true,
    f: 'fff',
})
export default class Index {
    render() {}
}
