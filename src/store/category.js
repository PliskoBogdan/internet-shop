import {getCategory, getCategories} from '@/services/categories.service'
const state = () => ({
    category: {},
    categories: [],
    categoryError: null
})
const mutations = {
    setCategory(state, category){
        state.category = category
    },
    setCategories(state, categories){
        state.categories = categories
    },
    setCategoriesError(state, error){
        state.categoryError = error
    }
}
const actions = {
   async fetchCategory({commit}, id){
     try{
        const category = await getCategory(id)
        commit('setCategory', category)
     } catch(err){  
        commit('setCategoriesError', err)
     }
   },
   async fetchCategories({commit}){
    try{
        const categories = await getCategories()
        commit('setCategories', categories)
     } catch(err){  
        commit('setCategoriesError', err)
     }
   }
}
const getters = {
    category: ({category}) => category,
    categories: ({categories}) => categories,
    categoryError: ({categoryError}) => categoryError
 }

 

export default {
    mutations,
    getters,
    actions,
    state
}