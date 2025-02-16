import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler); // 清除旧定时器
    }, [value, delay]);
    return debouncedValue;
}

// 使用示例：防抖的搜索输入
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);
useEffect(() => {
    // 当debouncedQuery变化时发起请求
    fetchData(debouncedQuery);
}, [debouncedQuery]);
