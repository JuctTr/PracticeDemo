/**
 * 计时器
 * @export
 * @returns
 */
export default {
    isStart: false,
    callbacks: [],
  
    /**
     * 注册计时器
     *
     * @param {{ key: string; func: () => void }} item
     */
    regist(item) {
      if (item.key && typeof item.func === 'function') {
        this.callbacks.push(item)
      }
      if (!this.isStart) {
        this.start()
      }
    },
  
    /**
     * 销毁计时器
     *
     * @param {string} key
     */
    unregist(key) {
      const index = this.callbacks.findIndex((item) => item.key === key)
      if (index >= 0) {
        this.callbacks.splice(index, 1)
      }
      if (this.callbacks.length === 0) {
        this.end()
      }
    },
    start() {
      if (this.isStart) return
      this.isStart = true
        this.timer = setInterval(() => {
        this.callbacks.forEach((item) => item.func())
      }, 1000)
    },
    end() {
      this.isStart = false
      this.callbacks = []
        clearInterval(this.timer);
    },
    pause() {
      this.isStart = false
        clearInterval(this.timer);
    },
    resume() {
      this.start()
    },
  }
  