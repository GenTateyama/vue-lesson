export default {
  incrementCount({commit}){
    commit('incrementCount'); // 特定のmutationを発火するための指定。
  },
}
