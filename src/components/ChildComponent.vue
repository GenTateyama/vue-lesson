<template>
  <div>
    <h2>{{ title }}</h2> <!-- propsで受け取ったのでバインディング可。 -->
    <slot name="head"></slot>
    <slot>default slot</slot>
    <slot name="foot"></slot>
  </div>
</template>

<!-- ここからロジック部分 -->
<script>
export default {
  beforeDestroy() {
    console.log('beforedestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
  props: { // 親から受け取りたい属性を配列/オブジェクトで指定
    title: { // 親の:title="item.title"と同義。
      type: String, // データの型を指定。
    }
  }
}
</script>
