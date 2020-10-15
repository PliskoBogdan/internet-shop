<template>
   <div class="card">
       <div class="card_header">
           {{title}} - {{price + '$'}}
       </div>
       <img :src="`http://${imageUrl}`" alt="img">
       <div class="card-footer">
           <button class="btn btn-info" @click="$emit('add-to-cart')" v-if="!inCart">Добавить в корзину</button>
           <button class="btn btn-danger" @click="$emit('add-to-cart')" v-else>Убрать</button>
       </div>
   </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        title: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        imageUrl: {
            type: String,
            default: ''
        },
      
        inCart:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
    .card{
        display: flex;
        justify-content: center;
        margin: 20px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 12px;
        img{
            width: 100%;
            height: 150px;
        }
        &-footer{
            border: none;   
            margin-top:5px;
            padding: 0;
            background-color: #fff;    
        }
    }
    
</style>