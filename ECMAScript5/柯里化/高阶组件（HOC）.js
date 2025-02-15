// 柯里化 HOC 增强组件
const withLoading = loadingMessage => WrappedComponent => {
    return function EnhancedComponent({ isLoading, ...props }) {
        return isLoading ? <div>{loadingMessage}</div> : <WrappedComponent {...props} />;
    };
};

// 使用
const UserListWithLoading = withLoading('Loading users...')(UserList);
