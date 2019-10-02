<template>
  <input type="text" v-model="computedValue">
</template>

<script>
export default {
  props: { // ここではvalueしか参照していないが、最終的に親側のform.nameに変化した値を組み込みたい。
    value: String,
  },
  computed: { // こっちでvalueの変化を監視。
    computedValue: {
      get() { // 値を参照する時に呼び出されるメソッド
        return this.value;
      },
      set(value) { // 値を更新するときに呼び出されるメソッド
        this.$emit('input', value);
// 現状のvalueを持って、親で@inputの発火を行う。
      }
    }
  }
}
</script>
