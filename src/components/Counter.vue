<template>
  <div>
    <button @click="incrementCount">Add to count</button>
    <!--親のmethodsで定義したincrementCountではなく、actionの処理を使用-->
    <p>{{ count }}回クリックされました</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // VueコンポーネントでmapStateを使うためには、vuexライブラリからmapStateをインポートする必要がある。

export default {
/*
  ~算出プロパティがあるコンポーネントにstateをバインドする記法~
      // ...mapState(["バインドするステートのキー"]),
      // storeのstateが変わるたび算出プロパティの再評価が発生し、関連した DOM の更新をトリガーする。
  computed: {
    ...mapState(['count']), // このコンポーネントではstateのcountを使うように指定。
  },
  methods: {
    ...mapActions(['incrementCount']), // 配列形式でactionsが格納されている。
      // 以下、emitで発火を命令するパターン。処理をここで行うのではなく、親で行う。ここでは「発火」だけを行う。
      // incrementCount() {this.$emit('increment');} // 親で発火させるイベントを指定。
  },
*/
  computed: {
      ...mapState('count', { // 第一引数には使用するストアのモジュール名
        count: state => state.count, // 受け取りたいprops名を関数名にする。
      // 第1引数にstateを受け取ることができるので、state.countと記述。
      }),
    },
    methods: {
      ...mapActions('count',[
        'incrementCount', // 使用したいアクションは配列の値として指定する。
      ]),
    },
  }
</script>
