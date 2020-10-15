<template>
  <div class="container"> 
    <template v-if="cartItems.length > 0">
        <ul class="list-group">
          <li 
            v-for="(item,key) in cartItems" :key="key"
            class="list-group-item"
            
          >
            {{item.title}} - {{item.price}}$
            
              
          </li>
      </ul>
      <div class="panael">
         
          Quantity: {{cartItems.length}}
          Total: {{cartTotalPrice}}$
      </div>
      <button class="btn btn-success" @click="handleGetPaymentIntent">Купить</button>
       <card class='stripe-card'
          :class='{ complete }'
          stripe='pk_test_51HcA7MLP0o0OVNijY8FRQRnSMOGHYctQuu2VAfXKuDsEv52156bORvYNdtEGsbYdQeOOwYtYe0Nob9ub5WrdxjDi00V5deUP68'
          :options='stripeOptions'
          @change='complete = $event.complete'
      />
      <button class='btn btn-success' @click='pay' :disabled='!complete'>Pay with credit card</button>
    </template>
      <template v-else>
          <img 
            src="https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="imgCart"
            class="empty-image"
           >
           <hr>
          Your cart is empty please add items to it
          
      </template>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { Card, handleCardPayment } from 'vue-stripe-elements-plus'
export default {
    name: 'Cart',
    components:{
      Card
    },
    data: () => ({
      
          complete: false,
          stripeOptions: {},
          paymentIntent: null
    }),
    computed: {
        ...mapGetters({
            cartItems: 'cartItems',
            cart: 'cart',
            cartTotalPrice: 'cartTotalPrice'
            
        })
    },
    methods: {
     ...mapActions({
       handleBuy: 'handleBuy'
     }),
     ...mapMutations({
       clearCart: 'clearCart'
     }),
     async handleGetPaymentIntent(){
      const intent = await this.handleBuy()
       this.paymentIntent = intent.client_secret;
      
     },
     async pay(){
       try{
        await handleCardPayment(this.paymentIntent)     
        this.clearCart()
       }catch(err){
         console.log(err);
       }
      
     }
    }
}
</script>

<style lang="scss">
    .empty-image{
        width: 400px;
    }
    .stripe-card {
        width: 300px;
        border: 1px solid grey;
      }
      .stripe-card.complete {
        border-color: green;
      }
    
</style>